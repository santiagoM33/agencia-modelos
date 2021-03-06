import React from 'react';
import SpanError from '../../../components/SpanError';
import { Alert } from '../../../components/Alert';

import { loginAccountAuth } from "../../../services/connect";


class FormLogin extends React.Component {
    state = {
        email: '',
        password: '',
        emailError: false,
        passwordError: false,
        hasError: false,
        errors: []
    }

    onHandleChange = e => {
        if (e.target.name === 'email') {
            this.setState({email: e.target.value})
        } else {
            if (e.target.value.length < 6) {
                this.setState({passwordError: true})
                
            } else {
                this.setState({passwordError: false})
                this.setState({password: e.target.value})
                this.setState({errors: []})
            }
        }
    }
    
    onHandleSubmit = e => {
        e.preventDefault();
        const {email, password, errors} = this.state;
        if (email.length > 0 && password.length > 0) {
            if (errors.length === 0) {
                loginAccountAuth({ email, password })
                    .then((res) => {
                        localStorage.setItem("token", JSON.stringify(res.token));
                        localStorage.setItem("user", JSON.stringify(res.user));
                        this.props.handleSuccessAuth(res);
                        this.setState({
                            errors: [],
                        });
                    })
                    .catch((err) => {
                        this.setState({
                            errors: err.errors,
                            ...this.setMessage("Usuario o Password incorrectos."),
                        });
                    });
            } 
        } 
    }

    setMessage = err => {return { loginMessage: err }}

    render() {
        const {emailError, passwordError, errors} = this.state;
        return (
            <form onSubmit={this.onHandleSubmit}>
                <div className='col-12'>
                        {errors.length
                        ? <Alert type='danger'>{errors}</Alert>
                        : null
                        }
                    <div className="col-12 form-group">
                        <input
                            type='email'
                            placeholder='Ingrese su email'
                            className='form-control col'

                            name='email'
                            aria-describedby={'email-error'} 
                            onChange={this.onHandleChange}
                        />
                        { emailError &&
                            <SpanError id='email-error'>El email es invalido.</SpanError>
                        }
                    </div>
                </div>
                <div className='col-12'>
                    <div className="col-12 form-group">
                        <input
                            type='password'
                            placeholder='Ingrese su password'
                            className='form-control col'

                            name='password'
                            aria-describedby={'pass-error'} 

                            onChange={this.onHandleChange}
                        />
                        { passwordError &&
                            <SpanError id='pass-error'>El password es invalido.</SpanError>
                        }
                    </div>
                </div>
                <div className='col-12 mb-2'>
                    <div className="col-12">
                        <a href='/reset-password-request' className='text-dark font-weight-italic offset-sm-6 offset-lg-8'>You forgot your password?</a>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="col-12 form-group">
                        <button type='submit' className='btn btn-danger btn-block'>Ingresar</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default FormLogin;