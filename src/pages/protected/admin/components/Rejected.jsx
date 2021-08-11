import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Table } from 'reactstrap';

class Rejected extends React.Component {
    state = {}

    showRejected = () => {
        const {data} = this.props.rejected;
        if(!data) return null;
        return (
            <React.Fragment>
                {this.props.loading
                ? <div class="sk-chase">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>
                : <>{data.map(status => {
                    return (
                        <tr key={status.id}>
                            <th scope="row">{status.id}</th>
                            <td>{status.alias}</td>
                            <td>{status.email}</td>
                            <td>{status.status}</td>
                            <td><Link className='btn btn-primary col' to={`/users/${status.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-light" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </Link></td>
                        </tr>
                    )
                })}
                </>
                }
            </React.Fragment>
        )
    }

    render() {
        return (
            <><Row>
                <Col sm="12">
                    <Card body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className='text-center'>#</th>
                                    <th>Alias</th>
                                    <th>Email</th>
                                    <th className='text-center'>Status</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showRejected()}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
                {/*<Navegation />*/}
            </>

        );
    }
}

export default Rejected;