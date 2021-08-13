import React from 'react';
import {Link} from 'react-router-dom';
import { getUsersById, getUsersStatus, updateUserData } from '../../../../services/connect';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class EditUsers extends React.Component {
    state = {
        form: {
            id: '',
            alias: '',
            email: '',
            status: '',
            roleId: '',
            userData: {}
        }
    }

    controller = new AbortController();

    updateData = () => {
        const dataPending = {
            status: 'pending',
        }
        getUsersStatus(this.controller.signal, dataPending)
    }

    handleChange = e => {
        e.persist();
        this.setState({form:{ [e.target.name]: e.target.value } })
    }

    editUser = (userUpdate, id) => {
        const form = {
            id: Number(id),
            alias: userUpdate.alias,
            email: userUpdate.email,
            status: userUpdate.status,
            roleId: userUpdate.roleId
        }

        updateUserData(form).then(res=>{
            const {updateData} = this;
            updateData()
            this.props.history.push('/admin')
        })
    }

    getUserData = () => {
        const {userId} = this.props.match.params;
        getUsersById(userId).then(userData=>this.setState({userData}))
    }

    componentDidMount(){
        this.getUserData()
    }

    render() {
        const { form, userData } = this.state;
        if(!userData) return null;
        const { id, alias, email, status, roleId } = userData;

        return (
            <article className='container'>
                <h3 className='mt-3'>Update Users Info</h3>
                <div className='row'>
                    <div className='offset-1 col-10'>
                        <Form>
                            <FormGroup>
                                <Label for="id" hidden>ID</Label>
                                <Input type="text" name="id" id="id" className='text-center' readOnly defaultValue={id}/>
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="alias">Username</Label>
                                        <Input type="text" name="alias" id="alias" onChange={this.handleChange} defaultValue={alias}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" onChange={this.handleChange} defaultValue={email}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="select" name="status" id="status" onChange={this.handleChange} defaultValue={status}>
                                    <option>pending</option>
                                    <option>approved</option>
                                    <option>rejected</option>
                                    <option>banned</option>

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="roleId">Role</Label>
                                <Input type="select" name="roleId" id="roleId" onChange={this.handleChange} defaultValue={roleId}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Input>
                            </FormGroup>
                            <Button className='btn' color='primary' onClick={()=>this.editUser(form,id)}>Update</Button>
                            <Link to='/admin' className='btn btn-secondary'>Cancel</Link>
                        </Form>
                    </div>
                </div>
            </article>
        );
    }
}

export default EditUsers;