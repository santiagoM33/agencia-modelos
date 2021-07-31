/* eslint-disable */
import React from 'react';
import { updateUserData } from '../../../../services/connect'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

class ModalAdmin extends React.Component {
    state = {
        form: {
            id: '',
            alias: '',
            email: '',
            status: '',
            roleId: '',
        }  
    }
    
    handleChange = e => {
        e.persist();
        this.setState({form:{[e.target.name]: e.target.value}})
    }

    render() {
        const { open, onToggleModal } = this.props;
        const { form } = this.state;
        const {id, alias, email, status, roleId} = form;
        //console.log('alias: ', alias)
        return (
            <>
                <Modal isOpen={open} toggle={()=>onToggleModal()} fade={false}>
                    <ModalHeader toggle={()=>onToggleModal()}>Update User Info</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="id" hidden>ID</Label>
                                <Input type="text" name="id" id="id" readOnly/>
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="alias">Username</Label>
                                        <Input type="text" name="alias" id="alias" onChange={this.handleChange} placeholder="username placeholder"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" onChange={this.handleChange} placeholder="email placeholder"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="select" name="status" id="status" onChange={this.handleChange} >
                                <option>Pending</option>
                                <option>Approved</option>
                                <option>Reject</option>
                                <option>Banned</option>  

                                </Input>
                              </FormGroup>
                            <FormGroup>
                                <Label for="role">Role</Label>
                                <Input type="select" name="role" id="role" onChange={this.handleChange} >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                </Input>
                            </FormGroup>
                        </Form> 
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>updateUserData(form).then(res=>console.log('Respuesta form',res))}>Update</Button>{' '}
                        <Button color="secondary" onClick={()=>onToggleModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default ModalAdmin;