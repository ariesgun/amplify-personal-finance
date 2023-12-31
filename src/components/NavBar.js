
// import { useAuthenticator } from "@aws-amplify/ui-react"

import { useAuthenticator } from "@aws-amplify/ui-react"
import { NavBarHeader2, NavBarHeader3} from "../ui-components"
import { useLocation, useNavigate } from "react-router-dom"

const navBarOverrides = (navigate, signOut) => {
    return ({
      'Home': {
        style: {
          cursor: 'pointer'
        },
        onClick: () => {
          navigate('/')
        }
      },
      'Contact': {
        style: {
          cursor: 'pointer'
        },
        onClick: () => {
          navigate('/contact')
        }
      },
      'Dashboard': {
        style: {
          cursor: 'pointer'
        },
        onClick: () => {
          navigate('/dashboard')
        }
      },
      'Records': {
        style: {
          cursor: 'pointer'
        },
        onClick: () => {
          navigate('/records')
        }
      },
      'BankSync': {
        style: {
          cursor: 'pointer'
        },
        onClick: () => {
          navigate('/sync-bank')
        }
      },
      'Profile': {
        style: {
          cursor: 'pointer'
        },
        onClick: () => {
          navigate('/profile')
        }
      },
      'Button39493466': {
        onClick: () => {
          navigate('/login')
        }
      },
      'Button39493467': {
        onClick: () => {
          navigate('/login')
        }
      },
      'SignOut': {
        onClick: () => {
          signOut()
          navigate('/')
        }
      }
    })
}

export default function NavBarHeader2Override() {
    const { route, user, signOut } = useAuthenticator(
        (context) => [context.user]
    );
    const location = useLocation()
    const navigate = useNavigate()
    
    return route === 'authenticated' ? (
        <NavBarHeader3
            width={'100%'}
            overrides={navBarOverrides(navigate, signOut)}
        />
    ) : (
        <NavBarHeader2
            width={'100%'}
            overrides={navBarOverrides(navigate, signOut)}
        />
    );
}