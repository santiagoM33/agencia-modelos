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
            approved: {},
            rejected: {},
            banned: {},
            models: [],
            loading: true,
            limit: 5,
            offset: 0,
            currentPage: 0,
            lastPage: 0
         }
    }

    controller = new AbortController();

    getUserPending = () => {
        const data = {
            status: 'pending',
            limit: this.state.limit,
            offset: this.state.offset
        }
        getUsers(this.controller.signal, data).then(pending => this.setState({ pending, loading: false }))
    }

    getUserApproved = () => {
        const data = {
            status: 'approved',
            limit: this.state.limit,
            offset: this.state.offset
        }
        getUsers(this.controller.signal, data).then(approved => this.setState({ approved, loading: false }))
    }

    getUserRejected = () => {
        const data = {
            status: 'rejected',
            limit: this.state.limit,
            offset: this.state.offset
        }
        getUsers(this.controller.signal, data).then(rejected => this.setState({ rejected, loading: false }))
    }

    getUserBanned = () => {
        const data = {
            status: 'banned',
            limit: this.state.limit,
            offset: this.state.offset
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

    setCurrentPage = currentPage => this.setState({currentPage})
    setLastPage = page => {
        //let lastPage = currentPage * itemsPerPage;
        //this.setState({lastPage})
    }

    prevPage = () => {
        let currentPage =  this.state.currentPage;
        let offset = this.state.offset;
        if(currentPage === 1) return null;
        currentPage-=1;
        offset -= 5;
        this.setState({currentPage, offset}, () => {
            this.getUserApproved()
        })
    }

    nextPage = () => {
        let currentPage =  this.state.currentPage;
        let offset = this.state.offset;
        //let lastPage = this.state.lastPage;
        //if(currentPage === lastPage) return null;
        currentPage++;
        offset += 5;
        this.setState({currentPage, offset}, () => {
            this.getUserApproved()
        })
    }

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
        const {getUserPending, getUserApproved, getUserRejected, getUserBanned} = this;
        const {user, models, token, pending, approved, rejected, banned, loading, currentPage, limit } = this.state;
        const users = {
            pending,
            approved,
            rejected,
            banned
        }
        
        //console.log('Approved: ', approved)
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
                                    currentPage={currentPage}
                                    limit={limit}
                                    prevPage={this.prevPage}
                                    nextPage={this.nextPage}
                                    getUserApproved={getUserApproved }
                                    setCurrentPage={this.setCurrentPage}
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