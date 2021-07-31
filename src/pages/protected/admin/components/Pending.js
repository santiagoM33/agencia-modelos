import React from 'react';
import { Card, Button, Row, Col, Table } from 'reactstrap';
import { updateStatus } from '../../../../services/connect';

class Pending extends React.Component {

    showPending = () => {
        const {pending, user} = this.props;
        if(pending.length === 0) return null;
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
                : <>{pending.map(status => {
                    return (
                        <tr key={status.id}>
                            <th scope="row">{status.id}</th>
                            <td>{status.alias}</td>
                            <td>{status.email}</td>
                            <td>{status.status}</td>
                            <td className='text-center'>
                                <Button className="btn btn-success" onClick={
                                    () => updateStatus(user.id, { status: 'approved' }).then(res => console.log('Respuesta: ', res))
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                    </svg>
                                </Button>
                                {"  "}
                                <Button className="btn btn-danger" onClick={
                                    () => updateStatus(user.id, { status: 'rejected' })
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </Button>
                            </td>
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
                                    <th>#</th>
                                    <th>Alias</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showPending()}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
                {/*<Paginated />*/}
            </>

        )
    }
}

export default Pending;