import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PublicRoute, PrivateRoute } from '../helpers/routeRedirectAuth';
import Header from '../components/Header';
import Home from '../pages/home/Home';
import ResetPasswordRequest from '../pages/ResetPasswordRequest';
import ResetPassword from '../pages/ResetPassword';
import 'bootstrap/dist/css/bootstrap.css';
import { getEscorts, getUsers } from '../services/connect';
import EditUsers from '../pages/protected/admin/pages/EditUsers';
import Profile from '../pages/protected/profile/Profile';
import EditModelProfile from '../pages/protected/profile/pages/EditModelProfile';
import Services from '../pages/protected/admin/pages/Services';
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

    /* ----------------- PAGINATE SECTION  --------------------- */

    setPaginateApproved = (currentPageApproved, offsetApproved) => this.setState({currentPageApproved, offsetApproved}, () => {
        this.getUserApproved()
    })

    setPaginatePending = (currentPagePending, offsetPending) => this.setState({currentPagePending, offsetPending}, () => {
        this.getUserPending()
    })

    setPaginateRejected = (currentPageRejected, offsetRejected) => this.setState({currentPageRejected, offsetRejected}, () => {
        this.getUserRejected()
    })

    setPaginateBanned = (currentPageBanned, offsetBanned) => this.setState({currentPageBanned, offsetBanned}, () => {
        this.getUserBanned()
    })

    /* -------------------- -------- ----------------------- */
    /* -------------------- -------- ----------------------- */

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
        const { getUserPending, getUserApproved, getUserRejected, getUserBanned, 
        setPaginateApproved, setPaginatePending, setPaginateRejected, setPaginateBanned } = this;
        const { user, models, token, pending, approved, rejected, banned, loading, 
        currentPageApproved, currentPagePending, currentPageRejected, currentPageBanned,
        limitApproved, limitPending, limitRejected, limitBanned } = this.state;
        const users = {
            pending,
            approved,
            rejected,
            banned
        }
        
        return ( 
            <BrowserRouter>
               <Header authed={!!user} user={user} handleLogout={this.handleLogout} />
                <main>
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
                                    //user={this.state.user}
                                    handleLogin={this.handleLogin}
                                    //fileGrabber={this.fileGrabber}
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
                                    //user={this.state.user}
                                    //handleLogin={this.handleLogin}
                                />
                            )}                         
                            />
                            <PrivateRoute exact path="/admin" authed={!!user} component={ privateProps => (
                                <Admin {...privateProps}
                                    user={user}
                                    users={users}
                                    loading={loading}
                                    
                                    currentPagePending={currentPagePending}
                                    currentPageApproved={currentPageApproved}
                                    currentPageRejected={currentPageRejected}
                                    currentPageBanned={currentPageBanned}
                                    
                                    limitApproved={limitApproved}
                                    limitPending={limitPending}
                                    limitRejected={limitRejected}
                                    limitBanned={limitBanned}

                                    setPaginateApproved={setPaginateApproved}
                                    setPaginatePending={setPaginatePending}
                                    setPaginateRejected={setPaginateRejected}
                                    setPaginateBanned={setPaginateBanned}

                                    getUserApproved={getUserApproved}
                                    getUserPending={getUserPending}
                                    getUserRejected={getUserRejected}
                                    getUserBanned={getUserBanned}
                                    
                                    loggedInStatus={this.state.loggedInStatus}
                                    handleLogout={this.handleLogout}
                                />
                            )}                    
                            />
                            <PrivateRoute exact path="/dashboard" authed={!!user} component={ privateProps => (
                                <Dashboard {...privateProps}
                                    //token={this.state.token}
                                    user={user}
                                    //users={this.state.users}
                                    //getUsers={this.getUsers}
                                    //role={this.state.role}
                                    //pagination={this.state.pagination}
                                    //handleLogout={this.handleLogout}
                                />
                            )}
                            />
                            <PrivateRoute exact path="/profile" authed={!!user} component={ privateProps => (
                                <Profile {...privateProps}
                                    //token={this.state.token}
                                    user={user}
                                    //users={this.state.users}
                                    //getUsers={this.getUsers}
                                    //role={this.state.role}
                                    //pagination={this.state.pagination}
                                    //handleLogout={this.handleLogout}
                                />
                            )}
                            />
                            <PrivateRoute exact path="/services" authed={!!user} component={ privateProps => (
                                <Services {...privateProps}
                                    //token={this.state.token}
                                    user={user}
                                    //users={this.state.users}
                                    //getUsers={this.getUsers}
                                    //role={this.state.role}
                                    //pagination={this.state.pagination}
                                    //handleLogout={this.handleLogout}
                                />
                            )}
                            />
                            <PrivateRoute exact path="/escorts/:escordId" authed={!!user} component={ privateProps => (
                                <EditModelProfile {...privateProps}
                                    token={token}
                                    user={user}
                                    models={models}
                                    //getUsers={this.getUsers}
                                    //role={this.state.role}
                                    //pagination={this.state.pagination}
                                    //handleLogout={this.handleLogout}
                                />
                            )}
                            />   
                            <PrivateRoute exact path="/users/:userId" authed={!!user} component={ privateProps => (
                                <EditUsers {...privateProps}
                                    //token={this.state.token}
                                    user={user}
                                    getUserPending={getUserPending}
                                    getUserApproved={getUserApproved}
                                    getUserRejected={getUserRejected}
                                    getUserBanned={getUserBanned}
                                />
                            )}
                            />  
                        </React.Suspense>
                    </Switch>
                </main>
            </BrowserRouter>
         );
    }
}
 
export default Routes;