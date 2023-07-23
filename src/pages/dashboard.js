import { Button, Divider, Flex, Heading, View } from "@aws-amplify/ui-react";
import NavBarHeader2Override from "../components/NavBar";
import { DataRowCollection, MarketingFooterSimple, RecordCreateForm, RecordUpdateForm } from "../ui-components";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Record } from "../models";


async function onDelete(item) {
    await DataStore.delete(Record, item)
}

export default function Dashboard() {

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
        <>
            <NavBarHeader2Override />
            <Flex
                direction={'column'}
                padding={{
                    "small": '20px 80px 20px 80px',
                    "large": '80px 240px 80px 240px'
                }}
                width={'80%'}
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
            <MarketingFooterSimple
                width={'100%'}
                position={'absolute'}
                bottom={'0'}
            />
        </>
    );
}