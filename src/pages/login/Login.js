import React from 'react';
import FormLogin from './form/FormLogin';

class Login extends React.Component {
    

    handleSuccessAuth = data => {
        this.props.handleLogin(data)
        if(data.user.roleId === 1) {
            this.props.history.push('admin')
        }else {
            this.props.history.push('dashboard')
        }
    }

    render() { 
        return (  
            <div className='container'>
                <div className='offset-md-2 col-md-8 card my-3 mt-sm-5 p-2 shadow-sm rounded-sm'>
                    <h3
                        className='text-center my-3 h5 text-dark'
                    >Ingresar</h3>
                    <div className='row'>
                        <div className='col-12'>
                            {/*<div className='col-12'>
                                Status: {this.props.loggedInStatus}
                            </div>*/}
                            <FormLogin 
                                onLogin={this.props.onLogin}
                                handleSuccessAuth={this.handleSuccessAuth}
                            />
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Login;