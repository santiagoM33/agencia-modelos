import React from "react";
//import "./announce.css";
import SpanError from '../../components/SpanError';
//import {saveUsers} from 'services/fakeApi'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


class Announce extends React.Component {
        state = {
            email: '',
            password: '',
            user: '',
            phone:'',
            country: null,
            category: 2,
            emailError: false,
            passError: false,
            userError: false,
            phoneError: false
        };
    
    onSelectCountry = e =>{
        this.setState({country: e.target.value})
    }

    onHandleChange = e => {
        switch (e.target.name) {
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
                if (e.target.value.length < 6){
                    this.setState({passError: true})
                } else {
                    this.setState({passError: false})
                }
                this.setState({password: e.target.value})
                break;
            case 'user':
                if (e.target.value.length < 8 ){
                    this.setState({userError: true})
                    
                } else {
                    this.setState({userError: false})
                }
                this.setState({user: e.target.value})
                break;
            /*case 'phone':
                if (e.target.value.length < 7 ){
                    this.setState({phoneError: true})
                    
                } else {
                    this.setState({phoneError: false})
                }
                this.setState({phone: e.target.value})
                break;*/
            default:
                break;
        }
    }
 
    isMatch = param => {
        if (param.email.length > 0 && param.password.length > 0 && param.user.length > 0 && param.phone.length > 0 && param.country.length > 0) {
            //const {email, password, user, phone, country, category} = param;
            /*saveUsers({
                email,
                password,
                user,
                phone,
                country,
                category
            }).then(res => {
                //console.log(res)
                //this.props.fileGrabber(res.user)
                localStorage.setItem('escort', JSON.stringify(res));
            }).catch(err => {
                console.log(err)
            })*/

            /*registerDataAccount(
                email,
                password,
                user,
                phone,
                category
            )*/
        }
    }

    _onHandleClick = e => {
        e.preventDefault();
        const {email, password, user, phone, country, category} = this.state;
        let account = {email, password, user, phone, country, category}
        if (account) {
            this.isMatch(account)
        }
    }

    render() {
        const {userError, emailError, passError, phoneError} = this.state;
        return (
            <div className="container">
                <div className='offset-md-2 col-md-8 card my-3 mt-sm-5 p-2 shadow-sm rounded-sm'>
                    <h3 className="text-center my-3 h4">Crea tu anuncio</h3>
                    <div className="col-12">
                        <form>
                            <div className="col-12 mb-3">
                                <div className="col-12 input-group">
                                    <input
                                        type="user"
                                        placeholder="Ingrese un nombre de usuario"
                                        className="form-control col"
                                        name="user"

                                        onChange={this._onHandleChange}
                                    />
                                    { userError &&
                                        <SpanError id='user-error' styles='form-text text-danger'>El nombre y apellido tiene que tener mas de 8 letras</SpanError>
                                    }
                                </div>
                            </div>
                            <div className="col-12 mb-3 input-group">
                                <div className="col-12 form-group">
                                    <input
                                        type="email"
                                        placeholder="Ingrese un email"
                                        className="form-control col"
                                        name="email"

                                        onChange={this._onHandleChange}
                                    />
                                    { emailError &&
                                        <SpanError id='email-error' styles='form-text text-danger'>El email es invalido.</SpanError>
                                    }
                                </div>
                            </div>
                            <div className="col-12 mb-3 input-group">
                                <div className="col-12 form-group">
                                    <input
                                        type="password"
                                        placeholder="Ingrese un password entre 6 y 20 caracteres"
                                        className="form-control col"
                                        name="password"

                                        onChange={this._onHandleChange}
                                    />
                                    { passError &&
                                        <SpanError id='password-error' styles='form-text text-danger'>El password tiene que tener mas de 6 letras</SpanError>
                                    }
                                </div>
                            </div>
                            <div className="col-12 input-group mb-3">
                                <PhoneInput
                                    placeholder="Ingresa tu numero de contacto"
                                    inputProps={{
                                        name: 'phone',
                                        required: true
                                      }}
                                    country='ar'
                                    regions={'south-america'}
                                    value={this.state.phone}
                                    onChange={phone => this.setState({ phone })}
                                    containerClass='col-12'
                                />
                                { phoneError &&
                                        <SpanError id='phone-error' styles='form-text text-danger'>El n° de contacto tiene que tener mas de 7 numeros</SpanError>
                                    }                                
                            </div>
                            <div className="col-12 mb-3">
                                <div className="col input-group">
                                    <select 
                                        className="custom-select"
                                        onChange={this._onSelectCountry}
                                    >
                                        <option defaultValue>
                                            -- Nacionalidad --
                                        </option>
                                        <option value="1">Argentina</option>
                                        <option value="2">Bolivia</option>
                                        <option value="3">Brazil</option>
                                        <option value="4">Chile</option>
                                        <option value="5">Colombia</option>
                                        <option value="6">Paraguay</option>
                                        <option value="7">Peru</option>
                                        <option value="8">Uruguay</option>
                                        <option value="9">Venezuela</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="col input-group">
                                    <button
                                        type='button'
                                        className='btn btn-danger btn-block'
                                        onClick={this._onHandleClick}
                                    >
                                    Publicar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Announce;
