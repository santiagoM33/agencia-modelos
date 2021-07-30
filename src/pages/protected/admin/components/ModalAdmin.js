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
        this.setState({form:{...this.state.form, [e.target.name]: e.target.value}})
    }

    render() {
        const { isOpen, onToggleModal, onModal } = this.props;
        console.log('Props: ', this.props)
        return (
            <>
                <Modal isOpen={isOpen} toggle={onToggleModal}>
                    <ModalHeader toggle={onToggleModal}>Update User Info</ModalHeader>
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
                                        <Input type="text" name="alias" id="alias" onChange={this.handleChange} placeholder="with a placeholder"/>
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
                        <Button color="primary" onClick={()=>onToggleModal}>Update</Button>{' '}
                        <Button color="secondary" onClick={onToggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default ModalAdmin;