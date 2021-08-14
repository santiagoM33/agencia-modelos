import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { updateService } from '../../../../services/connect';

class EditServices extends React.Component {
    servicesRef = React.createRef();
    descriptionRef = React.createRef();
    iconRef = React.createRef();


    _handleClick = () => {
        const servicesRef = this.servicesRef.current.value;
        const descriptionRef = this.descriptionRef.current.value;
        const iconRef = this.iconRef.current.value;
        const { serviceId } = this.props.match.params;
        const service = {
            id: serviceId,
            name: servicesRef.toUpperCase(),
            label: servicesRef.toLowerCase(),
            description: descriptionRef,
            icon: iconRef
        }
        updateService(service).then(res=>this.props.history.push('/services'))
    }

    render() {
        //const { serviceId } = this.props.match.params;
        //console.log('Service ID: ', serviceId)

        return (
            <React.Fragment>
                <div className='row container mt-5'>
                    <div className='col-12'>
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="services" className='font-weight-bold text-dark'>Servicios: </Label>
                                <Input type="text" innerRef={this.servicesRef} name="services" id="services" placeholder="Agregar label de servicios" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="description">Descripcion</Label>
                                <Input type="textarea" innerRef={this.descriptionRef} name="description" id="description" placeholder="Agregar una descripcion del servicios" />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-2">
                                <Label for="icon">Icon</Label>
                                <Input type="text" innerRef={this.iconRef} name="icon" id="icon" placeholder="Agregar icon patch. Ex. far fa-thumps" />
                            </FormGroup>
                            <Button color='primary' className='offset-2 offset-md-4 mt-4 mt-sm-3 mt-md-4' onClick={this._handleClick}>Actualizar</Button>
                            <Link className='btn btn-secondary offset-1 mt-4 mt-sm-3 mt-md-4' to='/services'>Volver</Link>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default EditServices;