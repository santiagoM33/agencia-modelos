import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import TableServices from './TableServices';
import { registerServices } from '../../../../services/connect';

class Services extends React.Component {
    servicesRef = React.createRef();
    descriptionRef = React.createRef();
    state = {
        service: ''
    }

    componentDidMount() {
        this.servicesRef.current.focus()
    }

    handleClick = () => {
        //this.setState({service: this.servicesRef.current.value})
        const servicesRef = this.servicesRef.current.value;
        const descriptionRef = this.descriptionRef.current.value;
        const service = {
            name: servicesRef.toUpperCase(),
            label: servicesRef.toLowerCase(),
            description: descriptionRef,
            icon: ''
        }
        registerServices(service).then(res => console.log('Repuesta register services: ', res))
    }

    render() {
        return (
            <React.Fragment>
                <div className='row container mt-5'>
                    <div className='col-12'>
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="services" className='font-weight-bold text-dark'>Servicios: </Label>
                                <Input type="text" innerRef={this.servicesRef} name="services" id="services" placeholder="Agregar label de servicios" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Descripcion</Label>
                                <Input type="textarea" innerRef={this.descriptionRef} name="description" id="description" />
                            </FormGroup>
                            <Button color='primary' className='mt-4 mt-sm-0 mt-md-0' onClick={this.handleClick}>Agregar</Button>
                        </Form>
                    </div>
                </div>
                <div className='row container mt-5'>
                    <TableServices />
                </div>
            </React.Fragment>
        );
    }
}

export default Services;