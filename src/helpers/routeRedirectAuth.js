import { Route } from "react-router"
import { Redirect } from "react-router-dom" 

export const PrivateRoute = ({component: Component, authed, ...rest}) => (
    <Route 
        {...rest}
        render = {
            props => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location} }}/>
        }
    />
)

export const PublicRoute = ({component: Component, authed, ...rest}) => (
    <Route 
        {...rest}
        render = {
            props => authed === false
            ? <Component {...props}/>
            : <Redirect to='/dashboard'/>
        }
    />
)