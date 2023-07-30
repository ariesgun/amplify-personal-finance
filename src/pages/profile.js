import NavBarHeader2Override from '../components/NavBar';
import { Divider, Flex, Heading } from '@aws-amplify/ui-react';
import { EditProfile, MarketingFooterSimple } from '../ui-components';

import '../App.css';

export default function Profile() {
    return (
        <Flex direction={'column'} height={'100vh'}>
            <NavBarHeader2Override width={'100%'} />
            <Flex
                direction={'column'}
                margin={'25px auto'} 
                grow={'1'}
            >
                <Heading level={4}>Your Profile</Heading>
                <Divider />
                <EditProfile />
            </Flex>
            <Flex>
                <MarketingFooterSimple
                    width={'100%'}
                />
            </Flex>
        </Flex>
    );
}