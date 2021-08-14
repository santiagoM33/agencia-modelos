import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { deleteService, getServices } from '../../../../services/connect';

class TableServices extends React.Component {
    state = {
        services: ''
    }

    controller = new AbortController();

    componentDidMount() {
        getServices(this.controller.signal).then(services => this.setState({ services: services.data }))
    }

    componentWillUnmount(){
        //this.controller.abort()
    }


    render() {
        const { services } = this.state
        if (!services) return null;
        
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Label</th>
                        <th className='text-center'>Description</th>
                        <th className='text-center'>Icon</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <th scope="row" className='col-1'>{service.id}</th>
                            <td className='text-center'>{service.name}</td>
                            <td className='text-center'>{service.label}</td>
                            <td className='text-center'>{service.description}</td>
                            <td className='text-center'>{service.icon}</td>
                            <td className='d-flex'><Link className='btn btn-primary col-6' to={`/services/${service.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-light" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </Link>
                                <Button className='col-6' color={'secondary'} onClick={()=>deleteService(service.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default TableServices;