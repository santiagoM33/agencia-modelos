import React from 'react';
import toast from 'react-hot-toast';
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
        },
        roleId: 0
    }

    getRoleId = () => this.setState({roleId: Number(JSON.parse(localStorage.getItem("user")).roleId)})

    componentDidMount(){
        this.getRoleId()
    }

    handleChange = e => {
        e.persist();
        this.setState({ form: { [e.target.name]: e.target.value } })
    }

    editUser = (userUpdate, id) => {
        const { data } = this.props.users;
        if (!data) return null;
        const form = {
            id: Number(id),
            alias: userUpdate.alias,
            email: userUpdate.email,
            status: userUpdate.status,
            roleId: userUpdate.roleId
        }
        updateUserData(form).then(res => {
            getUsers().then(res => this.setState({ status: res.data }))
            toast.success('Action successful');
            this.props.history.push('/admin')
        })

    }

    closeModal = () => this.props.history.push('/admin')

    render() {
        const { form } = this.state;
        const { data } = this.props.users;
        if (!data) return null;
        
        const { userId } = this.props.match.params;
        const USER = data.find(el => el.id === Number(userId))
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{USER.alias}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.state.roleId === 1

                                ? <Form>
                                    <FormGroup>
                                        <Label for="status">Change the status of this user</Label>
                                        <Input type="select" name="status" id="status" onChange={this.handleChange} defaultValue={{ label: USER.status, value: USER.status }}>
                                            <option>pending</option>
                                            <option>approved</option>
                                            <option>rejected</option>
                                            <option>banned</option>
                                        </Input>
                                    </FormGroup>
                                </Form>

                                : <Form>
                                    <FormGroup>
                                        <Label for="id" hidden>ID</Label>
                                        <Input type="text" name="id" id="id" className='text-center' readOnly defaultValue={USER.id} />
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
                                        <Input type="select" name="status" id="status" onChange={this.handleChange} defaultValue={{ label: USER.status, value: USER.status }}>
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
                                </Form>}
                        </div>
                        <div className="modal-footer">
                            <Button className='btn' color='primary' data-dismiss="modal" onClick={() => this.editUser(form, userId)}>Update</Button>
                            <Button className='btn' color='secondary' data-dismiss="modal" onClick={this.closeModal}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUsers;