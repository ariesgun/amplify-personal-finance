import { Button, Card, Divider, Flex, Heading, View, useTheme, Image, Grid, Loader, Text } from "@aws-amplify/ui-react";
import NavBarHeader2Override from "../components/NavBar";
import { useEffect, useState } from "react";
import { API, DataStore, Notifications } from "aws-amplify";
import { InAppMessageDisplay, useInAppMessaging, withInAppMessaging } from "@aws-amplify/ui-react-notifications";
import { v4 as uuidv4 } from 'uuid';

import '@aws-amplify/ui-react/styles.css';

import { MarketingFooterSimple } from "../ui-components";
import { Account, Record } from "../models";
import { transcode } from "buffer";
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

const css = `.custom-card-class {
    border: 3px solid lightblue;
    border-radius: 25px;
  }`;

function SyncBankFinish() {

    const { displayMessage } = useInAppMessaging();
    const [banks, setBanks] = useState([])
    const [selectedBank, setSelectedBank] = useState({})
    const [loadingSync, setLoadingSync] = useState(true)
    const [accounts, setAccounts] = useState([])
    const [transactions, setTransactions] = useState([])

    const myMessageReceivedHandler = (message) => {
    // Do something with the received message
        console.log("Hey", message)
        displayMessage(message);
    };

    const addTransactions = async (transactions) => {
        setLoadingSync(true)
        transactions.forEach( async (el) => {
            try {
                const result = await DataStore.query(Record, (c) => c.description.eq(el.internalTransactionId));

                if (result.length == 0) {
                    const updatedAcc = await DataStore.save(
                        new Record({
                            description: el.internalTransactionId,
                            name: el.creditorName || el.debtorName,
                            currency: el.transactionAmount.currency,
                            amount: parseFloat(el.transactionAmount.amount),
                            transactionDate: el.bookingDate
                        })
                    )
                }
            } catch(e) {
                console.log(e)
            }
        })
    }

    useEffect(() => {

        const fetchAccounts = async() => {
            try {
                const result = await DataStore.query(Account);
                return result
            } catch(e) {
                console.log(e)
            }
        }

        const updateAccounts = async(acc, status, iban) => {
            try {
                const updatedAcc = await DataStore.save(
                    Account.copyOf(acc, updated => {
                        updated.accountNum = iban
                        updated.status = status
                    })
                )
            } catch(e) {
                console.log(e)
            }
        }

        const fetchRequisitionId = async (requisitionId) => {
            try {
                const result = await API.get('api75983335', '/sync/' + requisitionId)
                console.log(result.body)
                console.log(result.body.balances)
                console.log(result.body.metadata)
                console.log(result.body.transactions)
                console.log(result.body.requisitionData)
                return result.body
            } catch(e) {
                console.log(e)
            }
        }

        fetchAccounts().then((_accounts) => {
            console.log("Accounts: ", _accounts)

            _accounts.forEach((acc) => {
                fetchRequisitionId(acc.requisitionId).then((res) => {
                    console.log(res)
                    console.log("Acc, ", acc)

                    updateAccounts(acc, res.requisitionData.status, res.metadata.iban)
                    setTransactions(res.transactions.transactions.booked)
                }).catch((e) => {
                    console.log(e)
                })
            })

            // Get Accounts
            setAccounts(_accounts)     

            // setBanks(result)
            // console.log(result, banks)
        })

        // InAppMessaging.syncMessages();
        // const listener = InAppMessaging.onMessageDisplayed(myMessageReceivedHandler);

        // setTimeout(() => {
        //     InAppMessaging.dispatchEvent(myFirstEvent);
        // }, 5000)
    }, [])

    useEffect(() => {
        console.log("transactions: ", transactions)
        if (transactions.length > 0) {
            setLoadingSync(false)
        }
    }, [transactions])

    const { tokens } = useTheme()
    const navigate = useNavigate()

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
                <Heading level={2}>Bank Sync</Heading>
                <Divider />
                {loadingSync ? (
                    <Flex
                        direction={'column'}
                        alignItems={'center'}
                        margin={'auto'}
                    >
                        <Loader size="large" />
                        <Heading level={4}>Fetching your account...</Heading>
                    </Flex>
                ) : (
                    <Grid
                        columnGap="0.5rem"
                        rowGap="0.5rem"
                    >
                        <style>{css}</style>
                        { 
                            accounts.map((account) => {
                                return (
                                    <>
                                    <Card
                                        key={account.id}
                                        className="custom-card-class"
                                        backgroundColor={tokens.colors.blue[10]}
                                        padding={'20px 20px 20px 20px'}
                                    >
                                        <Flex
                                            justifyContent={'space-between'}
                                        >
                                            <Flex
                                                width={'100%'}
                                                height={'100%'}
                                            >
                                                <Image src={account.logo} width={'5%'}></Image>
                                                <View padding={'10px 10px 10px 10px'}><Heading level={5}>{account.accountNum}</Heading></View>
                                            </Flex>
                                            <Button 
                                                variation={'link'}
                                                onClick={() => {
                                                    // setSelectedBank(bank.id)    
                                                    // setStartSync(true)   
                                                    addTransactions(transactions).then(() => {
                                                        setLoadingSync(false)
                                                        navigate('/records')
                                                    })
                                                }}
                                            >
                                                Update
                                            </Button>
                                        </Flex> 
                                    </Card>
                                    <Flex
                                        direction={'column'}
                                        margin={'25px auto'}
                                    >
                                        <Heading level={5}>Transactions</Heading>
                                        <Divider /> 
                                        {
                                            transactions.map((transaction) => (
                                                <Flex
                                                    key={transaction.internalTransactionId}
                                                    justifyContent={'flex-start'}
                                                    padding={'10px 5px 10px 5px'}
                                                >
                                                    <View width={'500px'}>{transaction.creditorName || transaction.debtorName}</View>
                                                    <View width={'280px'}>{transaction.bookingDate}</View>
                                                    <Flex
                                                        alignItems={'flex-start'}
                                                        justifyContent={'flex-start'}
                                                    >
                                                        <Text>{transaction.transactionAmount.currency}</Text>
                                                        <Text>{transaction.transactionAmount.amount}</Text>
                                                    </Flex>
                                                </Flex>
                                            ))
                                        }
                                    </Flex>
                                    </>
                                )
                            })
                        }
                    </Grid>
                )}
            </Flex>
            <Flex>
                <MarketingFooterSimple
                    width={'100%'}
                />
            </Flex>
        </Flex>
    );
}

export default withInAppMessaging(SyncBankFinish, {
    components: {
        ModalMessage: StyledModalMessage,
    }
})