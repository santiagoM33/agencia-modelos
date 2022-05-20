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
                </div>
            </div>
        );
    }
}

export default Register;