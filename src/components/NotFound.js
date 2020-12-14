import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppContext } from '../Context'
//import pg_not_found from '../assets/imgs/404.png';
//import '../styles/NotFound.css'

const NotFound = (props) => {
    const appContext = useAppContext();
    const history = useHistory()

    const redirectLink = () => {
        if ((appContext.isAuth && window.location.pathname === '/login') ||
            (appContext.isAuth && window.location.pathname === '/')) {
            history.push('/home')
        }
        else {
            history.push('/')
        }
    }

    useEffect(() => {
        redirectLink()
    })
    return (
        <>
        </>
    )
}

export default NotFound;



