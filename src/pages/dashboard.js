import { Button, Divider, Flex, Heading, View } from "@aws-amplify/ui-react";
import NavBarHeader2Override from "../components/NavBar";
import { MarketingFooterSimple } from "../ui-components";


export default function Dashboard() {
    return (
        <>
            <NavBarHeader2Override />
            <Flex
                direction={'column'}
                padding={'80px 240px 80px 240px'}
            >
                <Flex
                    width={'100%'}
                    justifyContent={'space-between'}
                >
                    <Heading level={2}>Records</Heading>
                    <Button>Create New</Button>
                </Flex>
                <Divider />
            </Flex>
            <MarketingFooterSimple
                width={'100%'}
            />
        </>
    );
}