import React from 'react';
import './FormProfile.css';
import { Col, Row, Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import { ImWhatsapp } from 'react-icons/im'

class FormProfile extends React.Component {
    state = {}
    render() {
        const MODEL = this.props.model
        if (!MODEL) return null;
        //console.log('MODEL: ', MODEL)
        return (
            <Form className='container'>
                <fieldset className='fieldset mt-3'>
                    <legend className='text-secondary'>Datos Personales</legend>
                <Row form>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="sex" sm={2}>Sexo: </Label>
                            <Col sm={12}>
                                <Input type="select" name="sex" id="sex" defaultValue={MODEL.sex}>
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
                                <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Ex. +542235787896" defaultValue={MODEL.phone} />
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
                                <Input type="number" name="yearOfBirth" id="yearOfBirth" placeholder="Ex. 2000" defaultValue={MODEL.yearOfBirth} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="location" sm={2}>Ciudad: </Label>
                            <Col sm={12}>
                                <Input type="text" name="location" id="location" placeholder="Ex. Mar del Plata" defaultValue={MODEL.location} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="countryOfBirth" sm={12}>Pais Nacimiento:</Label>
                            <Col sm={10}>
                                <Input type="text" name="countryOfBirth" id="countryOfBirth" placeholder="Ex. Argentina" defaultValue={MODEL.countryOfBirth} />
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
                                <Input type="textarea" name="bio" id="bio" defaultValue={MODEL.bio} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="profilePicture" sm={12}>Foto de Perfil</Label>
                            <Col sm={12}>
                                <Input type="file" name="profilePicture" id="profilePicture" defaultValue={MODEL.profilePicture} />
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
                                <Input type="textarea" name="serviceDescription" id="serviceDescription" defaultValue={MODEL.serviceDescription} />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                </fieldset>
                <Col sm={10}>
                    <Button color='primary' className='offset-4 offset-sm-6 offset-md-6 mb-4 mt-2 mt-sm-4'>UPDATE</Button>
                </Col>
            </Form>
        );
    }
}

export default FormProfile;