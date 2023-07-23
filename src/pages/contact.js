import { Flex } from "@aws-amplify/ui-react";
import { ContactUs, MarketingFooter } from "../ui-components";
import NavBarHeader2Override from "../components/NavBar";


export default function Contact() {
    return (
        <Flex
            direction={'column'}
            gap={'0'}
        >
        <NavBarHeader2Override />
        <ContactUs
            width={'100%'}
            padding={
            { 
                small: '50px 30px 50px 30px',
                large: '180px 320px 180px 320px'
            }
            }
        />
        <MarketingFooter 
            width={{base: '100%', medium: '100%'}}
        />
        </Flex>
    );
}