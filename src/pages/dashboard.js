import { Button, Card, Divider, Flex, Heading, View, useTheme } from "@aws-amplify/ui-react";
import NavBarHeader2Override from "../components/NavBar";
import { DataRowCollection, MarketingFooterSimple } from "../ui-components";
import { useEffect, useState } from "react";
import { DataStore, Notifications, Predicates, SortDirection } from "aws-amplify";
import { Record } from "../models";
import { InAppMessageDisplay, useInAppMessaging, withInAppMessaging } from "@aws-amplify/ui-react-notifications";

import '@aws-amplify/ui-react/styles.css';
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";

import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler
} from 'chart.js';
import { useNavigate } from "react-router-dom";

const { InAppMessaging } = Notifications;
const myFirstEvent = { name: 'first_event' };

const StyledModalMessage = (props) => (
    <InAppMessageDisplay.ModalMessage
      {...props}
      style={{ 
            container: { backgroundColor: 'antiquewhite' },
            body: { padding: '50px 0px 150px 0px' },
        }}
    />
);

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Account Balance'
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  const css = `.custom-card-class {
    border: 3px solid lightblue;
    border-radius: 25px;
  }`;

function Dashboard() {

    const [records, setRecords] = useState([])
    const [categories, setCategories] = useState([])
    const [cateogriesPerMonth, setCategoriesPerMonth] = useState({})
    const [cateogriesPerYear, setCategoriesPerYear] = useState({})
    const [recordsPerMonth, setRecordsPerMonth] = useState({})
    const { displayMessage } = useInAppMessaging();
    const navigate = useNavigate()

    const pieData = {
        labels: categories,
        datasets: [
          {
            label: 'Amount',
            data: cateogriesPerMonth,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    const pieTotalData = {
        labels: categories,
        datasets: [
          {
            label: 'Amount',
            data: cateogriesPerYear,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
    const lineData = {
      labels,
      datasets: [
        {
          fill: true,
          label: 'Balance',
          data: labels.map((el) => recordsPerMonth[el]),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const records = await DataStore.query(Record, Predicates.ALL, {
                    sort: (s) => s.transactionDate(SortDirection.DESCENDING)
                })
                return records;
            } catch (error) {
                console.log("Error fetching records", error)
            }
        }

        fetchRecords().then((_records) => {
            setRecords(_records.slice(0, 8))

            // Records per month
            let recordsPerMonth = {}
            labels.forEach( (e, idx) => {
                recordsPerMonth[e] = _records.reduce((total, current) => {
                    if (new Date(current.transactionDate).getMonth() === idx+1) {
                        return total + current.amount
                    } else {
                        return total
                    }
                }, 0) 
            });
            setRecordsPerMonth(recordsPerMonth)
            console.log("Per month: ", recordsPerMonth)

            const categories = new Set()
            _records.forEach((el) => {
                categories.add(el.category)
            })
            setCategories(Array.from(categories))

            // Records per category of this month
            let recordsPerCategory = []
            categories.forEach( (e, idx) => {
                recordsPerCategory.push(_records.reduce((total, current) => {
                    if ((new Date(current.transactionDate).getMonth() === new Date(Date.now()).getMonth()) && (current.category === e)) {
                        return total + current.amount
                    } else {
                        return total
                    }
                }, 0))
            });
            setCategoriesPerMonth(recordsPerCategory)
            console.log("Categories", categories)
            console.log("Per Category this month: ", recordsPerCategory)


            // Records per category in a year
            let recordsPerCategoryPerYear = []
            categories.forEach( (e, idx) => {
                recordsPerCategoryPerYear.push(_records.reduce((total, current) => {
                    if (current.category === e) {
                        return total + current.amount
                    } else {
                        return total
                    }
                }, 0))
            });
            setCategoriesPerYear(recordsPerCategoryPerYear)
            console.log("Per Year: ", recordsPerCategoryPerYear)

        })
        

        InAppMessaging.syncMessages();

        setTimeout(() => {
            InAppMessaging.dispatchEvent(myFirstEvent);
        }, 3000)
    }, [])

    const { tokens } = useTheme()

    return (
        <Flex
            direction={'column'}
            height={'100vh'}
        >
            <Flex>
                <NavBarHeader2Override />
            </Flex>
            <Flex
                direction={'column'}
                grow={'1'}
                width={'100%'}
                margin={'0 auto'}
                padding={'50px 450px 50px 450px'}
            >
                <Heading level={2}>Dashboard</Heading>
                <Divider />
                <Flex 
                    direction={'column'}
                    width={'100%'}
                >
                    <style>{css}</style>
                    <Card className="custom-card-class"
                        backgroundColor={tokens.colors.orange[10]}
                    >
                        <Flex
                            direction={'column'}
                            alignItems={'center'}
                        >
                            <View padding={'10px 10px 10px 10px'}><Heading level={5}>Total Balance</Heading></View>
                            <View>EUR 5000</View>
                        </Flex>
                        
                    </Card>
                </Flex>
                <Flex 
                    direction={'column'}
                    width={'100%'}
                >
                    <Line options={lineOptions} data={lineData} />
                </Flex>
                <Flex
                    direction={'column'}
                    alignItems={'center'}
                    padding={'50px 0px 0px 0px'}
                >
                    <Heading level={5}>Expenses per Category</Heading>
                    <Divider />
                    <Flex 
                        direction={'row'}
                        justifyContent={'center'}
                    >
                        <Card>
                            <Pie width={500} data={pieData} />
                        </Card>
                        <Card>
                            <Pie width={500} data={pieTotalData} />
                        </Card>
                    </Flex>
                </Flex>
                <Flex
                    direction={'column'}
                    alignItems={'center'}
                    padding={'50px 0px 50px 0px'}
                >
                    <Heading level={5}>Latest 8 records</Heading>
                    <Divider />
                    <DataRowCollection 
                        width={'100%'}
                        margin={'0 auto'}
                        items={records}
                        isPaginated={false}
                    />
                    <Button onClick={() => {
                        navigate('/records')
                    }}>
                        View all
                    </Button>
                </Flex>
            </Flex>
            <Flex>
                <MarketingFooterSimple
                    width={'100%'}
                />
            </Flex>
        </Flex>
    );
}

export default withInAppMessaging(Dashboard, {
    components: {
        ModalMessage: StyledModalMessage,
    }
})