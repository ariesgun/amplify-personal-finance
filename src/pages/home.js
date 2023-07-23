import NavBarHeader2Override from '../components/NavBar';
import { HeroLayout2, MarketingFooter } from '../ui-components';
import '../App.css';

export default function Home() {
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