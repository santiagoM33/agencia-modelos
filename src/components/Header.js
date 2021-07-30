import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import Hamburguer from './Hamburguer'
import ProtectedHeader from './ProtectedHeader';

class Header extends React.Component {
    state = {
        isMobile: true
    }
    render() {
        let component, { history, authed, handleLogout, user } = this.props;
        switch (history.location.pathname) {
            case '/':
            case '/login':
            case '/register':
            case '/announce':
                component = <header className='border-bottom border-danger'>
                    <div className="navbar navbar-expand-lg navbar-light bg-light">
                        <h1>
                            <Link className="navbar-brand text-dark" to="/">
                                {/*<img src={logo} width="90" height="60"></img>*/}
                                <h1 className='text-danger'><span className='text-primary'>A</span>M</h1>
                            </Link>
                        </h1>
                        <Hamburguer
                            classNames='dark'
                            target='#navbarNav'
                            controls='navbarNav'
                            toggle='collapse'
                        >
                        </Hamburguer>
                        <div className="collapse navbar-collapse row" id='navbarNav'>
                            <div className={`navbar-nav offset-lg-8 container`} >
                                {authed === true
                                    ? <>
                                        <NavLink activeClassName='active' className='text-dark col-4 offset-md-3 col-md-3 offset-lg-9 col-lg-1' to='/dashboard'>Dashboard</NavLink>
                                        <div className='col-4 col-md-6'>
                                            <NavLink className='nav-link text-dark' to='/login'
                                                onClick={() => {
                                                    handleLogout()
                                                }}>Logout</NavLink>
                                        </div>
                                    </>
                                    : <>
                                        <NavLink activeClassName='active' className='text-dark col-4 col-lg-1' to='/login'>Login</NavLink>
                                        <NavLink activeClassName='active' className='text-dark col-4 col-lg-1' to='/register'>Register</NavLink>
                                        <div className='col-4 col-lg-4'>
                                            <NavLink activeClassName='active' className='text-light btn btn-danger pl-1' to='/announce'>Announce</NavLink>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </header>
                break;
            case '/dashboard':
            case '/profile':
            case '/publish':
            case '/gallery':
                component = <ProtectedHeader user={user}
                                handleLogout={handleLogout}/>
                break;
            case '/admin':
                component = <header className='border-bottom border-danger'>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <h1>
                        <Link className="navbar-brand text-dark" to="/">
                            {/*<img src={logo} width="90" height="60"></img>*/}
                            <h1 className='text-danger'><span className='text-primary'>A</span>M</h1>
                        </Link>
                    </h1>
                    <Hamburguer
                        classNames='dark'
                        target='#navbarNav'
                        controls='navbarNav'
                        toggle='collapse'
                    >
                    </Hamburguer>
                    <div className="collapse navbar-collapse row" id='navbarNav'>
                        <div className='navbar-nav'>
                            {authed === true
                                ? <>
                                    <NavLink activeClassName='active' className='text-dark col-4 offset-lg-9 col-lg-1' to='/admin'>Admin</NavLink>
                                    <NavLink className='text-dark col-4 col-lg-1' to='/dashboard'>Dashboard</NavLink>
                                    <div className='col-4 col-lg-1'>
                                        <NavLink className='text-light btn btn-danger' to='/login'
                                            onClick={() => {
                                                handleLogout()
                                            }
                                        }
                                        >Logout</NavLink>
                                    </div>
                                </>
                                : <>
                                    <NavLink activeClassName='active' className='text-dark col-4 offset-lg-9 col-lg-1' to='/login'>Login</NavLink>
                                    <NavLink activeClassName='active' className='text-dark col-4 col-lg-1' to='/register'>Register</NavLink>
                                    <div className='col-4 col-lg-1'>
                                        <NavLink activeClassName='active' className='text-light btn btn-danger pl-1' to='/announce'>Announce</NavLink>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </header>
            break;
            default:
                component = <header className='border-bottom border-danger'>
                    <div className="navbar navbar-expand-lg navbar-light bg-light">
                        <h1>
                            <Link className="navbar-brand text-dark" to="/">
                                {/*<img src={logo} width="90" height="60"></img>*/}
                                <h1 className='text-danger'><span className='text-primary'>A</span>M</h1>
                            </Link>
                        </h1>
                        <Hamburguer
                            classNames='dark'
                            target='#navbarNav'
                            controls='navbarNav'
                            toggle='collapse'
                        >
                        </Hamburguer>
                        <div className="collapse navbar-collapse row" id='navbarNav'>
                            <div className='navbar-nav offset-lg-8'>
                                {authed === true
                                    ? <>
                                        <NavLink activeClassName='active' className='text-dark col-4 col-lg-4' to='/dashboard'>Dashboard</NavLink>
                                        <div className='col-4 col-lg-4'>
                                            <NavLink className='nav-link text-dark' to='/login'
                                                onClick={() => {
                                                    handleLogout()
                                                }
                                                }
                                            >Logout</NavLink>
                                        </div>
                                    </>
                                    : <>
                                        <NavLink activeClassName='active' className='text-dark col-4 col-lg-4' to='/login'>Login</NavLink>
                                        <NavLink activeClassName='active' className='text-dark col-4 col-lg-4' to='/register'>Register</NavLink>
                                        <div className='col-4 col-lg-4'>
                                            <NavLink activeClassName='active' className='text-light btn btn-danger pl-1' to='/announce'>Announce</NavLink>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </header>
            break;
        }
        return (
            <>
                {component}
            </>
        );
    }
}

export default withRouter(Header);