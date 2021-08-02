import React from 'react';
import {Link} from 'react-router-dom';
import { updateUserData, getUsers } from '../../../../services/connect';
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class EditUsers extends React.Component {
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
        this.setState({form:{ [e.target.name]: e.target.value } })
    }

    editUser = (userUpdate, id) => {
        const { data } = this.props.users;
        if(!data) return null;
        const form = {
            id: Number(id),
            alias: userUpdate.alias,
            email: userUpdate.email,
            status: userUpdate.status,
            roleId: userUpdate.roleId
        }
        updateUserData(form).then(res=>{
            getUsers().then(res=>this.setState({pending: res.data.filter(a=>a.status === 'pending')}))
            getUsers().then(res=>this.setState({approved: res.data.filter(a=>a.status === 'approved')}))
            getUsers().then(res=>this.setState({rejected: res.data.filter(a=>a.status === 'rejected')}))
            getUsers().then(res=>this.setState({banned: res.data.filter(a=>a.status === 'banned')}))
            this.props.history.push('/admin')
        })

    }

    render() {
        const { form } = this.state;
        const { data } = this.props.users;
        if(!data) return null;
        //const { id, alias, email, status, roleId } = form;
        const {userId} = this.props.match.params;
        const USER = data.find(el=>el.id === Number(userId))   
        return (
            <article className='container'>
                <h3 className='mt-3'>Update Users Info</h3>
                <div className='row'>
                    <div className='offset-1 col-10'>
                        <Form>
                            <FormGroup>
                                <Label for="id" hidden>ID</Label>
                                <Input type="text" name="id" id="id" className='text-center' readOnly defaultValue={USER.id}/>
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="alias">Username</Label>
                                        <Input type="text" name="alias" id="alias" onChange={this.handleChange} defaultValue={USER.alias} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" onChange={this.handleChange} defaultValue={USER.email} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="select" name="status" id="status" onChange={this.handleChange} defaultValue={{ label:USER.status, value:USER.status }}>
                                    <option>pending</option>
                                    <option>approved</option>
                                    <option>rejected</option>
                                    <option>banned</option>

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="roleId">Role</Label>
                                <Input type="select" name="roleId" id="roleId" onChange={this.handleChange} defaultValue={USER.roleId}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </Input>
                            </FormGroup>
                            <Button className='btn' color='primary' onClick={()=>this.editUser(form,userId)}>Update</Button>
                            <Link to='/admin' className='btn btn-secondary'>Cancel</Link>
                        </Form>
                    </div>
                </div>
            </article>
        );
    }
}

export default EditUsers;