import React from 'react';
import { Card, Button, Row, Col, Table } from 'reactstrap';

class Banned extends React.Component {
    state = {}
    render() {
        const {banned} = this.props;
        return (
            <><Row>
                <Col sm="12">
                    <Card body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Alias</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {banned.map(status => {
                                    return (
                                        <tr key={status.id}>
                                            <th scope="row">{status.id}</th>
                                            <td>{status.alias}</td>
                                            <td>{status.email}</td>
                                            <td>{status.status}</td>
                                            <td><Button className='btn btn-primary col'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-light" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                </svg>
                                            </Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
                {/*} <Paginated />*/}
                {/* : <div className='text-center mt-4'>No hay elementos que mostrar</div>}*/}
            </>

        );
    }
}

export default Banned;