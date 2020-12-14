import { Route, Switch} from 'react-router-dom'
import NotFound from './components/NotFound';
import Login from './components/Login'
import Home from './components/Home'
import {useAppContext} from './Context'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

const Routes = () => {
    const appContext = useAppContext();
    return (
        <Switch>
            {!appContext.isAuth && 
                <Route exact path={['/', '/login']}>
                    <Login/>
                </Route> 
            }
            {appContext.isAuth && 
                <Route exact path={['/home']}>
                    <Home/>
                </Route> 
            }
            <Route exacth path={['/reset-password']}>
                <ResetPassword/>
            </Route> 
            <Route exacth path={['/forgot-password']}>
                <ForgotPassword/> 
            </Route>
            <Route path = '*'> 
                <NotFound/>
            </Route> 
        </Switch>  
    )
}

export default Routes