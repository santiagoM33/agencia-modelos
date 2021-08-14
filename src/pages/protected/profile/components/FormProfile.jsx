import React from 'react';
import './FormProfile.css';
import { Col, Row, Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import { ImWhatsapp } from 'react-icons/im'
import { Link } from 'react-router-dom';
import {updateEscorts} from '../../../../services/connect'

class FormProfile extends React.Component {
    state = {
        sex: '',
        phone: 0,
        whatsapp: false,
        yearOfBirth: 0,
        location: '',
        countryOfBirth: '',
        bio: '',
        profilePicture: '',
        serviceDescription: '',
        services: ''
    }

    _onHandleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onHandleSubmit = () => {
        const MODEL = this.props.model
        if (!MODEL) return null;
        const { sex, phone, yearOfBirth, location, countryOfBirth, bio, profilePicture, serviceDescription} = this.state;
        const form = {
            id: MODEL.id,
            sex,
            phone,
            yearOfBirth,
            location,
            countryOfBirth,
            bio,
            profilePicture,
            serviceDescription
        }
        updateEscorts(form).then(res=>console.log('Res update: ', res))
    }
    
    render() {
        const MODEL = this.props.model
        if (!MODEL) return null;
    
        return (
            <Form className='container' onSubmit={this.onHandleSubmit}>
                <fieldset className='fieldset mt-3'>
                    <legend className='text-secondary'>Datos Personales</legend>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="sex" sm={2}>Sexo: </Label>
                            <Col sm={12}>
                                <Input type="select" name="sex" id="sex" onChange={this._onHandleChange} defaultValue={MODEL.sex}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Trans</option>
                                </Input>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="phoneNumber" sm={2}>Telefono: </Label>
                            <Col sm={12}>
                                <Input type="text" name="phone" id="phoneNumber" onChange={this._onHandleChange} placeholder="Ex. +542235787896" defaultValue={MODEL.phone} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={2} className='mt-md-5'>
                        <FormGroup check>
                            <Label check>
                                <Col sm={12}>
                                    <Input type="checkbox" />{' '}
                                    <ImWhatsapp color='green' /> WhatsApp
                                </Col>
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="yearOfBirth" sm={12}>Año de Nacimiento: </Label>
                            <Col sm={12}>
                                <Input type="number" name="yearOfBirth" id="yearOfBirth" onChange={this._onHandleChange} placeholder="Ex. 2000" defaultValue={MODEL.yearOfBirth} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="location" sm={2}>Ciudad: </Label>
                            <Col sm={12}>
                                <Input type="text" name="location" id="location" onChange={this._onHandleChange} placeholder="Ex. Mar del Plata" defaultValue={MODEL.location} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="countryOfBirth" sm={12}>Pais Nacimiento:</Label>
                            <Col sm={10}>
                                <Input type="text" name="countryOfBirth" id="countryOfBirth" onChange={this._onHandleChange} placeholder="Ex. Argentina" defaultValue={MODEL.countryOfBirth} />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                </fieldset>
                <fieldset className='fieldset my-3'>
                    <legend className='text-secondary'>Datos Laborales</legend>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="bio" sm={6}>Bio</Label>
                            <Col sm={12}>
                                <Input type="textarea" name="bio" id="bio" onChange={this._onHandleChange} defaultValue={MODEL.bio} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="profilePicture" sm={12}>Foto de Perfil</Label>
                            <Col sm={12}>
                                <Input type="file" name="profilePicture" id="profilePicture" onChange={this._onHandleChange} defaultValue={MODEL.profilePicture} />
                                <FormText color="muted">
                                    This is some placeholder block-level help text for the above input.
                                    It's a bit lighter and easily wraps to a new line.
                                </FormText>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="serviceDescription" sm={6}>Descripcion del servicio: </Label>
                            <Col sm={12}>
                                <Input type="textarea" name="serviceDescription" id="serviceDescription" onChange={this._onHandleChange} defaultValue={MODEL.serviceDescription} />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                </fieldset>
                <Col sm={10}>
                    <Button color='primary' className='offset-2 offset-sm-4 offset-md-5 mb-4 mt-2 mt-sm-4'>UPDATE</Button>
                    <Link to='/profile' className='ml-2 mb-4 mt-2 mt-sm-4 btn btn-secondary'>CANCEL</Link>
                </Col>
            </Form>
        );
    }
}

export default FormProfile;