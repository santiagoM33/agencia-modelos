import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './ProtectedHeader.css';

class ProtectedHeader extends React.Component {
    state = {  }
    render() { 
        const {history, handleLogout, user} =  this.props;
        if(!history || !handleLogout) return null;

        return ( 
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                <a href='/dashboard'><h3 className="my-0 mr-md-auto font-weight-normal text-danger"><span className='text-primary'>A</span>M</h3></a>
                <nav className="my-2 my-md-0 mr-md-3">
                    {(user.roleId === 2 ) &&
                        <>
                            <Link className="p-xs-1 p-2 text-dark" to="/gallery">Gallery</Link>
                            <Link className="p-xs-1 p-2 text-dark" to="/publish">Publish</Link>
                        </>
                    }
                    {user.roleId === 1 && 
                        <Link className="p-xs-1 p-2 text-dark" to="/admin">Admin</Link>
                    }
                    <Link className="p-xs-1 p-2 text-dark" to="/profile">Profile</Link>
                
                <NavLink className='p-xs-1 btn btn-outline-primary' to='/login'
                    onClick={() => {
                        history.push('/login')
                        handleLogout()
                    }}>Logout</NavLink>
                </nav>
            </div>
         );
    }
}
 
export default withRouter(ProtectedHeader);