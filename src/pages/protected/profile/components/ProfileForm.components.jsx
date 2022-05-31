import React from 'react';
import { updateMe } from '../../../../services/connect';


class ProfileForm extends React.Component {
    state = {
        sex: '',
        phone: '',
        //whatsapp: false,
        yearOfBirth: 0,
        location: '',
        countryOfBirth: '',
        bio: '',
        profilePicture: '',
        serviceDescription: '',
        services: ''
    }

    _onHandleChange = e => this.setState({[e.target.name]: e.target.value});

    onHandleClick = (e) => {
        e.preventDefault();
        const MODEL = JSON.parse(localStorage.getItem('user'));
        if (!MODEL) return null;
        const { sex, phone, yearOfBirth, location, countryOfBirth, bio, profilePicture, serviceDescription} = this.state;
        const form = {
            userId: MODEL.id,
            sex,
            phone,
            yearOfBirth,
            location,
            countryOfBirth,
            bio,
            profilePicture,
            serviceDescription
        }
        updateMe(form).then(res=>console.log('Res update: ', res))
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <textarea className="form-control" placeholder='Bio' rows="3" name='bio' onChange={this._onHandleChange}></textarea>
                </div>
                <div className="form-group">
                    <textarea className="form-control" placeholder='Service description' name='serviceDescription' rows="3" onChange={this._onHandleChange}></textarea>
                </div>
                <div className='row'>
                    <div className="form-group col-6">
                        <select className="form-control" onChange={this._onHandleChange} name='countryOfBirth'>
                            <option defaultValue>Country of Birth</option>
                            <option value='argentina'>Argentina</option>
                            <option value='colombia'>Colombia</option>
                            <option value='paraguay'>Paraguay</option>
                            <option value='uruguay'>Uruguay</option>
                            <option value='brasil'>Brasil</option>
                        </select>
                    </div>
                    <div className="form-group col-6">
                        <select className="form-control" onChange={this._onHandleChange} name='yearOfBirth'>
                            <option defaultValue>Year of Birth</option>
                            <option value='1980'>1980</option>
                            <option value='1981'>1981</option>
                            <option value='1982'>1982</option>
                            <option value='1983'>1983</option>
                            <option value='1984'>1984</option>
                            <option value='1985'>1985</option>
                            <option value='1986'>1986</option>
                            <option value='1987'>1987</option>
                            <option value='1988'>1988</option>
                            <option value='1989'>1989</option>
                            <option value='1990'>1990</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Location" name='location' onChange={this._onHandleChange}/>
                </div>
                <div className="form-group">
                    <input type="phone" className="form-control" placeholder="phone" name='phone' onChange={this._onHandleChange}/>
                </div>
                <div className='row'>
                    <div className="col-6">
                        <input type="button" className="btn btn-outline-primary btn-block" value="Male" name='sex' onClick={this._onHandleChange}/>
                    </div>
                    <div className="col-6">
                        <input type="button" className="btn btn-outline-primary btn-block" value="Female" name='sex' onClick={this._onHandleChange}/>
                    </div>
                </div>
                <div className="mt-3">
                    <button className="btn btn-outline-primary btn-block" onClick={this.onHandleClick}>Update Profile</button>
                </div>
            </form>
        );
    }
}

export default ProfileForm;