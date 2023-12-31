import { Button, Card, Divider, Flex, Heading, View, useTheme, Image, Grid, Loader } from "@aws-amplify/ui-react";
import NavBarHeader2Override from "../components/NavBar";
import { useEffect, useState } from "react";
import { API, DataStore, Notifications } from "aws-amplify";
import { InAppMessageDisplay, useInAppMessaging, withInAppMessaging } from "@aws-amplify/ui-react-notifications";
import { v4 as uuidv4 } from 'uuid';

import '@aws-amplify/ui-react/styles.css';

import { MarketingFooterSimple } from "../ui-components";
import { Account } from "../models";

const { InAppMessaging } = Notifications;
const myFirstEvent = { name: 'premium_offer' };

const css = `.custom-card-class {
    border: 3px solid lightblue;
    border-radius: 25px;
  }`;

const StyledBannerMessage = (props) => (
    <InAppMessageDisplay.BannerMessage
        {...props}
        style={{ 
            container: { backgroundColor: 'antiquewhite' },
            body: { padding: '0px 0px 0px 0px' },
        }}
        position={ 'middle' }
    />
);

function SyncBank() {

    const [banks, setBanks] = useState([])
    const [selectedBank, setSelectedBank] = useState({})
    const [startSync, setStartSync] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchBanks = async() => {
            try {
                const result = await API.get('api75983335', '/banks/NL')
                return result.body
            } catch(e) {
                console.log(e)
            }
        }

        fetchBanks().then((_banks) => {
            const result = JSON.parse(_banks)
            setBanks(result)
            setLoading(false)
        })

        InAppMessaging.syncMessages();

        setTimeout(() => {
            InAppMessaging.dispatchEvent(myFirstEvent);
        }, 2000)
    }, [])

    useEffect(() => {
        console.log(window.location.host)
    }, [banks])

    useEffect(() => {
        const initSession = async () => {
            try {
                const data = {
                    body: {
                        reference_id: uuidv4(),
                        bank_id: selectedBank,
                        redirect_url: "http://" + window.location.host + '/sync-bank-finish'
                    }
                }
                const res = await API.post('api75983335', '/init', data)
                return JSON.parse(res.body);
            } catch (e) {
                console.log(e)
            }
        }

        if (startSync) {
            initSession().then((res) => {
                // Redirect to res.url
                console.log(res)

                DataStore.save(
                    new Account({
                        bank: res.institution_id,
                        logo: selectedBank.logo,
                        accountNum: "",
                        requisitionId: res.id,
                        status: res.status
                    })
                );

                window.location.replace(res.link)

            }).catch((e) => {
                console.log(e)
            })
        }
    }, [startSync, selectedBank])

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
                <Heading level={2}>Bank Sync</Heading>
                <Divider />
                {(startSync || loading) && (
                    <Flex
                        direction={'column'}
                        alignItems={'center'}
                        margin={'auto'}
                    >
                        <Loader size="large" />
                        <Heading level={4}>Loading...</Heading>
                    </Flex>
                ) || (
                    <Grid
                        columnGap="0.5rem"
                        rowGap="0.5rem"
                    >
                        <style>{css}</style>
                        { 
                            banks.map((bank) => {
                                return (
                                    <Card
                                        key={bank.id}
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
                                                <Image src={bank.logo} width={'5%'}></Image>
                                                <View padding={'10px 10px 10px 10px'}><Heading level={5}>{bank.name}</Heading></View>
                                            </Flex>
                                            <Button 
                                                variation={'link'}
                                                onClick={() => {
                                                    setSelectedBank(bank.id)    
                                                    setStartSync(true)                                            
                                                }}
                                            >
                                                Sync
                                            </Button>
                                        </Flex> 
                                    </Card>
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

export default withInAppMessaging(SyncBank, {
    components: {
        BannerMessage: StyledBannerMessage,
    }
})