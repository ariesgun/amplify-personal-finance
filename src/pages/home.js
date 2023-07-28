import NavBarHeader2Override from '../components/NavBar';
import { HeroLayout2, MarketingFooter } from '../ui-components';
import '../App.css';
import { useEffect } from 'react';
import { API } from 'aws-amplify';
// import NordigenClient from 'nordigen-node';

export default function Home() {

    useEffect(() => {

        // const client = new NordigenClient({
        //     secretId: process.env.NORDIGEN_SECRET_ID,
        //     secretKey: process.env.NORDIGEN_SECRET_KEY
        // })
        // API.get('nordigen', '/records/123', {
        //     queryStringParameters: {
        //       accountId: '123'
        //     }}).then((response) => {
        //     console.log("Hello", response)
        // }).catch((error) => {
        //     console.log(error);
        // });
    }, [])

    return (
        <>
            <NavBarHeader2Override 
                width={'100%'}
            />
            <HeroLayout2
                width={'100%'}
                // overrides={HeroLayout2Override(router)}
            />
            <MarketingFooter
                width={'100%'}
            />
        </>
    );
}