import React from 'react';
import { Card, Button, Row, Col, Table } from 'reactstrap';
import { updateStatus } from '../../../../services/connect';
import Swal from 'sweetalert2';
import NavegationPending from './NavegationPending';

class Pending extends React.Component {

    state = {
        pendingItemsRemaining: this.props.pending.itemsRemaining,
        pendingPagesRemaining: this.props.pending.pagesRemaining,
    }
    

    prevPage = () => {
        const { setPaginatePending } = this.props;
        let currentPage = this.props.currentPage;
        let offset = currentPage * this.props.limit;
        if(currentPage < 0) return null;
        if(offset < 0) return null;
        currentPage-=1;
        offset -= 5;
        setPaginatePending(currentPage, offset)
    }

    nextPage = () => {
        //const { approvedPagesRemaining } = this.state;
        const { setPaginatePending } = this.props;
        let currentPage = this.props.currentPage;
        let offset = currentPage * this.props.limit;
        //let lastPage = approvedPagesRemaining;
        //if(currentPage === lastPage) return null;
        currentPage++;
        offset += 5;
        setPaginatePending(currentPage, offset)
    }

    showPending = () => {
        const {data} = this.props.pending;
        if (!data) return null;
  
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
                            <td className='text-center d-flex'>
                                <Button className="btn btn-success" onClick={
                                    () => updateStatus(status.id, { status: 'approved' }).then(res=>{
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, approved it!',
                                            willClose: ()=>this.props.getUserPending()
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              Swal.fire(
                                                'Approved!',
                                                'Your file has been approved.',
                                                'success'
                                                )
                                            }
                                          })
                                    })
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                    </svg>
                                </Button>
                                {"  "}
                                <Button className="btn btn-danger" onClick={
                                    () => updateStatus(status.id, { status: 'rejected' }).then(res=>{
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, reject it!',
                                            willClose: ()=>this.props.getUserPending()
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              Swal.fire(
                                                'Rejected!',
                                                'The user has been rejected.',
                                                'success'
                                              )
                                            }
                                          })
                                    })
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
        const {pendingPagesRemaining} = this.state;
        const {pending, currentPage, limit} = this.props;
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
                                {this.showPending()}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
                {//!!pendingPagesRemaining && 
                    <NavegationPending
                        pending={pending} 
                        currentPage={currentPage}
                        limit={limit}
                        prevPage={this.prevPage}
                        nextPage={this.nextPage}
                    />
                }
            </>

        )
    }
}

export default Pending;