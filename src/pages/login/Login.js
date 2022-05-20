import React from 'react';
import FormLogin from './form/FormLogin';

class Login extends React.Component {


    handleSuccessAuth = data => {
        this.props.handleLogin(data)
        if (data.user.roleId === 1) {
            this.props.history.push('admin')
        } else {
            this.props.history.push('dashboard')
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
                    <div className='col-12 mb-2'>
                        <p>New to AT-Pro? <a href='/register' className='font-weight-italic offset-sm-6 offset-lg-8 text-primary'>signup</a></p>
                    </div>
                    <div className='col-12 mb-2'>
                        <p>Forgot your password? <a href='/reset-password-request' className='font-weight-italic offset-sm-6 offset-lg-8 text-primary'>reset your password?</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;