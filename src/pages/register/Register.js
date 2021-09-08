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
                <div className='offset-md-2 col-md-8 card my-3 mt-sm-5 p-2 shadow rounded-sm'>
                        {/*<div className='col-12'>
                            Status: {this.props.loggedInStatus}
                        </div>*/}
                    <h3
                        className='text-center my-3 h4 text-dark'
                    >Registrar Usuario</h3>
                    <div
                        className='col-12'
                    >
                        <FormRegister 
                            handleSuccessAuth={this.handleSuccessAuth}
                            //fileGrabber={this.props.fileGrabber}
                        />
                    </div>
                </div>
            </div>
           
         );
    }
}
 
export default Register;