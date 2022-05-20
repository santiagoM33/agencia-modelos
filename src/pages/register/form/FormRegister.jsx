import React from 'react';
import SpanError from '../../../components/SpanError';

import { getRoles, registerDataAccount } from "../../../services/connect";

class FormRegister extends React.Component {
    state= {
        alias: '',
        email: '',
        password: '',
        roleId: 3,
        //Manejo de errores en cada campo
        aliasError: false,
        emailError: false,
        passError: false,
        //Manejo de errores generales
        hasError: false,
        //Login
        isLogin: false
    }

    controller = new AbortController();
        
    componentDidMount(){
        getRoles(this.controller.signal).then(res=>console.log(res))
    }
 
    _onHandleChange = e => {
        switch (e.target.name) {
            case 'alias':
                if (e.target.value.length < 4 ){
                    this.setState({aliasError: true})
                    
                } else {
                    this.setState({aliasError: false})
                }
                this.setState({alias: e.target.value})
                break;
            case 'email':
                const patternEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

                if (!patternEmail.test(e.target.value)) {
                    this.setState({emailError: true})
                } else {
                    this.setState({emailError: false})
                }

                this.setState({email: e.target.value})
                break;    
            case 'password':
                if (e.target.value.length < 6 ){
                    this.setState({passError: true})
                } else {
                    this.setState({passError: false})
                }
                this.setState({password: e.target.value})
                break;
            default:
                break;
        }
    }
 

    isMatch = param => {
        if (param.alias.length > 0 && param.email.length > 0 && param.password.length > 0) {
            const {alias, email, password, roleId} = param;
            //let fileName = `${firstName} ${lastName}`;
            //this.props.fileGrabber(fileName)
            registerDataAccount({
                alias,
                email,
                password,
                roleId,
            }).then(res => {
                localStorage.setItem('token', JSON.stringify(res.token));
                localStorage.setItem('user', JSON.stringify(res.user));
                this.props.handleSuccessAuth(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    onHandleSubmit = e => {
        e.preventDefault();
        const {alias, email, password, roleId} = this.state;
        let account = {alias, email, password, roleId};
        if (account) {
            this.isMatch(account)
        }
    }

    _handleChange = e => {
        this.setState({roleId: e.target.value})
    }

    componentWillUnmount(){this.controller.abort()}

    render() {
        const {aliasError, emailError, passError } = this.state;
        return (
            <form onSubmit={this.onHandleSubmit.bind(this)}>
                <div className='input-group'>
                    <div className="col-12 form-group">
                        <input 
                            type='text'
                            placeholder='Ingrese su nombre de usuario'
                            className='form-control'

                            name='alias'
                            aria-describedby={'alias-error'} 

                            value={this.name}
                            onChange={this._onHandleChange}
                        />
            
                        { aliasError &&
                            <SpanError id='alias-error' styles='form-text text-danger'>Su nombre debe contener mas de 4 letras.</SpanError>
                        }
                    </div>
                </div>
                <div className='col-12'>
                    <div className="form-group">
                        <input
                            type='email'
                            placeholder='Ingrese su email'
                            className='form-control col'

                            name='email'
                            aria-describedby={'email-error'} 

                            value={this.name}
                            onChange={this._onHandleChange}
                        />
                        { emailError &&
                            <SpanError id='email-error' styles='form-text text-danger'>El email es invalido.</SpanError>
                        }
                    </div>
                </div>
                <div className='col-12'>
                    <div className="form-group">
                        <input 
                            type='password'
                            placeholder='Escriba un password'
                            className='form-control col'

                            name='password'
                            aria-describedby={'pass-error'} 

                            value={this.name}
                            onChange={this._onHandleChange}
                        />
                        { passError &&
                            <SpanError id='pass-error' styles='form-text text-danger'>El password debe contener numeros, signos, mayúsculas y minúsculas</SpanError>
                        }
                    </div>
                </div>
                <div className='col-12 mb-3 mx-1'>
                    <div className='container'>
                            <button type='button' className='btn btn-outline-primary btn-block col-6' onClick={this._handleChange}>User</button>
                            <button type='button' className='btn btn-outline-primary col-6' onClick={this._handleChange}>Escort</button>
                    </div>
                </div>
                <div className='col'>
                    <div className=' mb-3'>
                        <button type='submit' className='btn-primary btn-block'>Registrarse</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default FormRegister;