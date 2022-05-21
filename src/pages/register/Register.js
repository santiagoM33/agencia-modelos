import React from 'react';
import FormRegister from './form/FormRegister';

class Register extends React.Component {
  
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
                <div className='offset-md-2 col-md-8 my-3 mt-sm-5 p-2'>
                    <div className='col-12'>
                        <FormRegister 
                            handleSuccessAuth={this.handleSuccessAuth}
                        />
                    </div>
                    <div className='container'>
                        <div className='col-12'>
                            <p className='my-0'>Already have an account? <a href='/login' className='font-weight-italic offset-sm-6 offset-lg-8 text-primary text-decoration-none'>signin</a></p>
                        </div>
                        <div className='col-12'>
                            <p className='my-0'>Forgot your password? <a href='/reset-password-request' className='font-weight-italic offset-sm-6 offset-lg-8 text-primary text-decoration-none'>reset your password?</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;