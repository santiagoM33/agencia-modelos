import React from 'react';
import './MenuInside.css';
import { withRouter, Link } from 'react-router-dom';
import { MenuInsideAdmin, MenuInsideEscort, MenuInsideUser, MenuOutsideData } from './MenuData'

class HeaderMenu extends React.Component {
    state = {
        sidebar: false
    }

    showSidebar = () => this.setState({sidebar: !this.state.sidebar})
    
    render() { 
        let component, {authed, handleLogout, user} = this.props;
        switch (this.props.location.pathname) {
            case '/':
            case '/login':
            case '/register':
                component = <>
                    {MenuOutsideData.map((item, index) => (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                <span onClick={this.showSidebar}>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </>
            break;
            case '/dashboard':
            case '/gallery':
            case '/profile':
                component = <> 
                    {authed && MenuInsideEscort.map((item, index) => (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                <span onClick={this.showSidebar}>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                    <li className='nav-text'>
                            <Link to='/login' onClick={handleLogout}>
                                <span onClick={this.showSidebar}>Logout</span>
                            </Link>
                    </li>
                </>
            break;
            case '/admin':
                component = <> 
                {authed && user.user.roleId === 1 &&
                    MenuInsideAdmin.map((item, index) => (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                <span onClick={this.showSidebar}>{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
                    <li className='nav-text'>
                        <Link to='/login' onClick={handleLogout}>
                            <span onClick={this.showSidebar}>Logout</span>
                        </Link>
                    </li>
                </>
            break;
            default:
                component = <>
                {MenuInsideUser.map((item, index) => (
                    <li key={index} className={item.cName}>
                        <Link to={item.path} onClick={handleLogout}>
                            <span onClick={this.showSidebar}>{item.title}</span>
                        </Link>
                    </li>
                ))}
                    <li className='nav-text'>
                        <Link to='/login' onClick={handleLogout}>
                            <span onClick={this.showSidebar}>Logout</span>
                        </Link>
                    </li>
                </>
            break;
        }
        return (
            <aside className='sidebar'>
            <Link to='#' className='menu-bars mt-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list mr-4" viewBox="0 0 16 16" onClick={this.showSidebar}>
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </Link>
            <nav className={`d-flex flex-column ml-5 ${this.state.sidebar ? 'nav-menu active' : 'nav-menu'}`}>
                <ul className='nav-menu-items'>
                    <li className='sidebar-toggle'>
                        <Link to='#' className='menu-bars mt-3' onClick={this.showSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        </Link>
                    </li>
                </ul>
                { 
                    component
                }
            </nav>
        </aside>
        );
    }
}
 
export default withRouter(HeaderMenu);