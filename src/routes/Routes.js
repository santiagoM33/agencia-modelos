import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PublicRoute, PrivateRoute } from '../helpers/routeRedirectAuth';
import Header from '../components/Header';
import Home from '../pages/home/Home';
import ResetPasswordRequest from '../pages/ResetPasswordRequest';
import ResetPassword from '../pages/ResetPassword';
import 'bootstrap/dist/css/bootstrap.css';
import { getEscorts, getUsers } from '../services/connect';
const EditUsers = React.lazy(() => import('../pages/protected/admin/pages/EditUsers'));
const Profile = React.lazy(() => import('../pages/protected/profile/Profile'));
const EditModelProfile = React.lazy(() => import('../pages/protected/profile/pages/EditModelProfile'));
const Services = React.lazy(() => import('../pages/protected/admin/pages/Services'));
const EditServices = React.lazy(() => import('../pages/protected/admin/pages/EditServices'));
//const Escort = React.lazy(() => import('../pages/home/pages/Escort'));
const Login = React.lazy(() => import('../pages/login/Login'));
const Register = React.lazy(() => import('../pages/register/Register'));
const Announce = React.lazy(() => import('../pages/announce/Announce'));
const Admin = React.lazy(() => import('../pages/protected/admin/Admin'));
const Dashboard = React.lazy(() => import('../pages/protected/dashboard/Dashboard'));


class Routes extends React.Component {
    
    constructor(...props){
        super(...props);
        const user = JSON.parse(localStorage.getItem("user")) ?? null;
        const token = JSON.parse(localStorage.getItem("token")) ?? null;
    
        this.state = { 
            loggedInStatus: '',
            user,
            token,
            pending: {},
            currentPagePending: 0,
            limitPending: 5,
            offsetPending: 0,
            approved: {},
            currentPageApproved: 0,
            limitApproved: 5,
            offsetApproved: 0,
            rejected: {},
            currentPageRejected: 0,
            limitRejected: 5,
            offsetRejected: 0,
            banned: {},
            currentPageBanned: 0,
            limitBanned: 5,
            offsetBanned: 0,
            models: [],
            loading: true,
            lastPage: 0
         }
    }

    controller = new AbortController();

    getUserPending = () => {
        const data = {
            status: 'pending',
            limit: this.state.limitPending,
            offset: this.state.offsetPending
        }
        getUsers(this.controller.signal, data).then(pending => this.setState({ pending, loading: false }))
    }

    getUserApproved = () => {
        const data = {
            status: 'approved',
            limit: this.state.limitApproved,
            offset: this.state.offsetApproved
        }
        getUsers(this.controller.signal, data).then(approved => this.setState({ approved, loading: false }))
    }

    getUserRejected = () => {
        const data = {
            status: 'rejected',
            limit: this.state.limitRejected,
            offset: this.state.offsetRejected
        }
        getUsers(this.controller.signal, data).then(rejected => this.setState({ rejected, loading: false }))
    }

    getUserBanned = () => {
        const data = {
            status: 'banned',
            limit: this.state.limitBanned,
            offset: this.state.offsetBanned
        }
        getUsers(this.controller.signal, data).then(banned => this.setState({ banned, loading: false }))
    }

    componentDidMount() {
        this.getUserPending()
        this.getUserApproved()
        this.getUserRejected()
        this.getUserBanned()
        getEscorts(this.controller.signal).then(res=>this.setState({models: res}))
    }

    /* ----------------- LOGIN SECTION  --------------------- */
    handleLogin = data => this.setState({loggedInStatus: 'LOGGED_IN',user: data})
    
    handleLogout = () => {
        this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: null
        })
        localStorage.clear('user')
    }
    /* -------------------- -------- ----------------------- */
    /* -------------------- -------- ----------------------- */


    //componentWillUnmount(){this.controller.abort()}

    render() { 
        const { user, models, token, pending, approved, rejected, banned } = this.state;
        const users = {
            pending,
            approved,
            rejected,
            banned
        }
        
        return ( 
            <BrowserRouter>
               <Header authed={!!user} user={user} handleLogout={this.handleLogout} />
                <main className='container'>
                    <Switch>
                        <Route exact path='/' render={props => (
                            <Home {...props}
                                models={models}
                            />
                        )} 
                        />
                        <Route exact path='/reset-password-request' render={ResetPasswordRequest}/>
                        <PublicRoute exact path='/reset-password' render={ResetPassword}/>
                        <React.Suspense fallback={<p>Loading...</p>}>
                            <Route exact path="/login" component={ publicProps => (
                                <Login {...publicProps}
                                    handleLogin={this.handleLogin}
                                />
                            )}
                            />
                            <Route exact path="/register" component={ publicProps => (
                                <Register {...publicProps} 
                                    handleLogin={this.handleLogin} 
                                />
                            )}
                            />
                            <Route exact path="/announce" component={ publicProps => (
                               <Announce {...publicProps}
                                    //handleLogin={this.handleLogin}
                                />
                            )}                         
                            />
                            <PrivateRoute exact path="/admin" authed={!!user} component={ privateProps => (
                                <Admin {...privateProps}
                                    user={user}
                                    
                                    loggedInStatus={this.state.loggedInStatus}
                                    handleLogout={this.handleLogout}
                                />
                            )}                    
                            />
                            <PrivateRoute exact path="/dashboard" authed={!!user} component={ privateProps => (
                                <Dashboard {...privateProps}
                                    //token={this.state.token}
                                    user={user}
                                />
                            )}
                            />
                            <PrivateRoute exact path="/profile" authed={!!user} component={ privateProps => (
                                <Profile {...privateProps}
                                    //token={this.state.token}
                                    user={user}
                                />
                            )}
                            />
                            <PrivateRoute exact path="/services" authed={!!user} component={ privateProps => (
                                <Services {...privateProps}
                                    //token={this.state.token}
                                    user={user}
                                />
                            )}
                            />
                            <PrivateRoute exact path="/services/:serviceId" authed={!!user} component={ privateProps => (
                                <EditServices {...privateProps}
                                    //token={this.state.token}
                                    user={user}
                                />
                            )}
                            />
                            <PrivateRoute exact path="/escorts/:escordId" authed={!!user} component={ privateProps => (
                                <EditModelProfile {...privateProps}
                                    token={token}
                                    user={user}
                                    models={models}
                                />
                            )}
                            />   
                            <PrivateRoute exact path="/users/:userId" authed={!!user} component={ privateProps => (
                                <EditUsers {...privateProps}
                                    //token={this.state.token}
                                    user={user}
                                />
                            )}
                            />  
                            {/*<Route exact path="/:escortName" component={ publicProps => (
                                <Escort {...publicProps}
                                    
                                />
                            )}
                            />*/}
                        </React.Suspense>
                    </Switch>
                </main>
            </BrowserRouter>
         );
    }
}
 
export default Routes;