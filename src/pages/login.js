import NavBarHeader2Override from '../components/NavBar';
import '../App.css';
import { Authenticator, Flex, View, useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { route } = useAuthenticator((context) => [context.route])
    const navigate = useNavigate()

    useEffect(() => {
        if (route === 'authenticated') {
            navigate('/dashboard', { replace: true })
        }
    }, [route, navigate])

    return (
        <>
            <NavBarHeader2Override 
                width={'100%'}
            />
            <View
                textAlign={'center'}
                marginTop={'5rem'} 
            >
                <Authenticator />
            </View>
        </>
    );
}