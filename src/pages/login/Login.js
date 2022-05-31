import React from 'react';
import FormLogin from './form/FormLogin';
import { Toaster } from 'react-hot-toast';

class Login extends React.Component {


    handleSuccessAuth = data => {
        this.props.handleLogin(data)
        if (data.user.roleId === 1) {
            this.props.history.push('admin')
        } else if (data.user.roleId === 2 || data.user.roleId === 3) {
            this.props.history.push('dashboard')
        } else {
            console.log('Problemas con esta pagina')
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='offset-md-2 col-md-8 my-3 mt-sm-5 p-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <FormLogin
                                onLogin={this.props.onLogin}
                                handleSuccessAuth={this.handleSuccessAuth}
                            />
                        </div>
                    </div>
                    <div className='col-12'>
                        <p className='my-0'>New to AT-Pro? <a href='/register' className='font-weight-italic text-primary text-decoration-none'>signup</a></p>
                    </div>
                    <div className='col-12'>
                        <p className='my-0'>Forgot your password? <a href='/reset-password-request' className='font-weight-italic text-primary text-decoration-none'>reset your password?</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;