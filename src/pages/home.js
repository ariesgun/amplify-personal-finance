import NavBarHeader2Override from '../components/NavBar';
import { HeroLayout2, MarketingFooter } from '../ui-components';
import '../App.css';
import { Flex } from '@aws-amplify/ui-react';


export default function Home() {

    return (
        <Flex
            direction={'column'}
            height={'100vh'}
        >
            <NavBarHeader2Override 
                width={'100%'}
            />
            <Flex 
                grow={'1'}
            >
                <HeroLayout2
                    width={'100%'}
                    height={'100%'}
                    // overrides={HeroLayout2Override(router)}
                />
            </Flex>
            <MarketingFooter
                width={'100%'}
            />
        </Flex>
    );
}