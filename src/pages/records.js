import { Button, Divider, Flex, Heading, View } from "@aws-amplify/ui-react";
import NavBarHeader2Override from "../components/NavBar";
import { DataRowCollection, MarketingFooterSimple, RecordCreateForm, RecordUpdateForm } from "../ui-components";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Record } from "../models";

import '@aws-amplify/ui-react/styles.css';


async function onDelete(item) {
    await DataStore.delete(Record, item)
}

function Records() {

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [records, setRecords] = useState([])
    const [selectedRecord, setSelectedRecord] = useState({})

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const records = await DataStore.query(Record);
                console.log(records)
                return records;
            } catch (error) {
                console.log("Error fetching records", error)
            }
        }

        const records = fetchRecords()
        setRecords(records)
    }, [])

    return (
        <Flex
            direction={'column'}
            height={'100vh'}
        >
            <Flex>
                <NavBarHeader2Override />
            </Flex>
            <Flex
                grow={'1'}
                direction={'column'}
                padding={{
                    "small": '20px 80px 20px 80px',
                    "large": '80px 290px 80px 290px'
                }}
                width={'82%'}
                margin={'0 auto'}
            >
                <Flex
                    width={'100%'}
                    justifyContent={'space-between'}
                >
                    <Heading level={2}>Records</Heading>
                    <Button onClick={() => {setShowCreateModal(true);}}>Create New</Button>
                </Flex>
                <Divider />
                <DataRowCollection 
                    width={'100%'}
                    margin={'0 auto'}
                    records={records}
                    overrideItems={({item, index}) => ({
                        overrides: {
                            "EditButton": {
                                onClick: () => {
                                    setSelectedRecord(item)
                                    setShowEditModal(true);
                                }
                            },
                            "RemoveButton": {
                                onClick: () => {
                                    setSelectedRecord(item)
                                    onDelete(item)
                                }
                            }
                        }
                    })}
                />
                <View className="modal" style={{display: showCreateModal === false && 'none'}}>
                    <RecordCreateForm 
                        onCancel={() => {
                            setShowCreateModal(false);
                        }}
                        onSuccess={() => {
                            setShowCreateModal(false);
                        }}
                    />
                </View>
                <View className="modal" style={{display: showEditModal === false && 'none'}}>
                    <RecordUpdateForm 
                        record={selectedRecord}
                        onCancel={() => {
                            setSelectedRecord({})
                            setShowEditModal(false);
                        }}
                        onSuccess={() => {
                            setSelectedRecord({})
                            setShowEditModal(false);
                        }}
                    />
                </View>
            </Flex>
            <Flex>
                <MarketingFooterSimple
                    width={'100%'}
                />
            </Flex>
        </Flex>
    );
}

export default Records;