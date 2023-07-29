import { Button, Card, Divider, Flex, Heading, View, useTheme } from "@aws-amplify/ui-react";
import NavBarHeader2Override from "../components/NavBar";
import { DataRowCollection, MarketingFooterSimple } from "../ui-components";
import { useEffect, useState } from "react";
import { DataStore, Notifications, Predicates } from "aws-amplify";
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

import { faker } from '@faker-js/faker';

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
      text: 'Chart.js Line Chart'
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const lineData = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const css = `.custom-card-class {
    border: 3px solid lightblue;
    border-radius: 25px;
  }`;

function Dashboard() {

    const [records, setRecords] = useState([])
    const { displayMessage } = useInAppMessaging();

    const myMessageReceivedHandler = (message) => {
    // Do something with the received message
        console.log("Hey", message)
        displayMessage(message);
    };

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const records = await DataStore.query(Record, Predicates.ALL, {
                    page:0,
                    limit: 5
                });
                console.log(records)
                return records;
            } catch (error) {
                console.log("Error fetching records", error)
            }
        }

        fetchRecords().then((_records) => {
            setRecords(_records)
        })
        

        InAppMessaging.syncMessages();
        const listener = InAppMessaging.onMessageDisplayed(myMessageReceivedHandler);

        // setTimeout(() => {
        //     InAppMessaging.dispatchEvent(myFirstEvent);
        // }, 5000)
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
                            <Pie width={500} data={data} />
                        </Card>
                        <Card>
                            <Pie width={500} data={data} />
                        </Card>
                    </Flex>
                </Flex>
                <Flex
                    direction={'column'}
                    alignItems={'center'}
                    padding={'50px 0px 50px 0px'}
                >
                    <Heading level={5}>Top 5 records</Heading>
                    <Divider />
                    <DataRowCollection 
                        width={'100%'}
                        margin={'0 auto'}
                        items={records}
                        isPaginated={false}
                    />
                    <Button>
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