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
            users: [],
            models: []
         }
    }

    controller = new AbortController();
    
    componentDidMount(){
        getUsers(this.controller.signal).then(res=>this.setState({users: res}))
        getEscorts(this.controller.signal).then(res=>this.setState({models: res}))
    }
    

    handleLogin = data => this.setState({loggedInStatus: 'LOGGED_IN',user: data})
    
    handleLogout = () => {
        this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: null
        })
        localStorage.clear('user')
    }

    //componentWillUnmount(){this.controller.abort()}

    render() { 
        const {user, users, models} = this.state;
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
                        <Route exact path='/reset-password-request' component={ResetPasswordRequest}/>
                        <PublicRoute exact path='/reset-password' component={ResetPassword}/>
                        <React.Suspense fallback={<p>Loading...</p>}>
                            <Route exact path="/login" render={ publicProps => (
                                <Login {...publicProps}
                                    //user={this.state.user}
                                    handleLogin={this.handleLogin}
                                    //fileGrabber={this.fileGrabber}
                                />
                            )}
                            />
                            <Route exact path="/register" render={ publicProps => (
                                <Register {...publicProps} 
                                    handleLogin={this.handleLogin} 
                                />
                            )}
                            />
                            <Route exact path="/announce" render={ publicProps => (
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
                            <PrivateRoute exact path="/users/:userId" authed={!!user} component={ privateProps => (
                                <EditUsers {...privateProps}
                                    //token={this.state.token}
                                    user={user}
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