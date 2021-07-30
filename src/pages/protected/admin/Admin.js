import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button,Row, Col, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import classnames from 'classnames';
import { getUsers } from '../../../services/connect';
import ModalAdminManager from './components/ModalAdminManager';
import Paginated from './components/Paginated';

class Admin extends React.Component {
    state = {
        activeTab: '1',
        Users: [],
        show: false,
        currentPage: 1,
        postPerPage: 5,
        totalPages: 0,
        totalItems: 0,
        loading: false
    }

    controller = new AbortController();
    
    componentDidMount(){
        getUsers(this.controller.signal).then(res=>this.setState({Users: res, totalPages: res.pagesRemaining, totalItems: res.itemsRemaining}))
    }

    setActiveTab = tab => {
        this.setState({ activeTab: tab })
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) this.setActiveTab(tab)
    }

    toggleShow = () => {
        this.setState({show: !this.state.show})
    }

    handleChange = e =>{
        e.persist();
        this.setState({form:{...this.state.form, [e.target.name]: e.target.value}})
    }

    catchUser= user => {
        this.setState({form:{
            id: user.id, 
            alias: user.alias, 
            email: user.email, 
            status: user.status, 
            roleId: user.roleId}
        })
    }

    //Verificar como mejorar esto
    //componentWillUnmount(){this.controller.abort()}

    render() {
        const { user, users } = this.props;
        const { activeTab, Users, show, currentPage, postPerPage } = this.state;
        if (!user || !users.data || !Users.data || !activeTab) return null;
        
        //let pending = (users.data.filter(p => p.status === 'pending') || Users.data.filter(p => p.status === 'pending'));
        //let approved = (users.data.filter(a => a.status === 'approved') || Users.data.filter(a => a.status === 'approved'));
        //let rejected = (users.data.filter(r => r.status === 'rejected') || Users.data.filter(r => r.status === 'rejected'));
        //let banned = (users.data.filter(b => b.status === 'banned') || Users.data.filter(b => b.status === 'banned'));

        /* PAGINATION */
        let itemsRemaining = users.itemsRemaining || Users.itemsRemaining;
        let pagesRemaining = users.pagesRemaining || Users.pagesRemaining;

        const indexOfLastPost = currentPage * postPerPage;
        const indexOfFirstPost = indexOfLastPost - postPerPage;
        const currentPosts = users.data.slice(indexOfFirstPost, indexOfLastPost) || Users.data.slice(indexOfFirstPost, indexOfLastPost);
        
        let pending = currentPosts.filter(a=>a.status === 'pending');
        let approved = currentPosts.filter(a=>a.status === 'approved');
        let rejected = currentPosts.filter(a=>a.status === 'rejected');
        let banned = currentPosts.filter(a=>a.status === 'banned');

        const paginate = pageNum => this.setState({currentPage: pageNum})
        const nextPage = () => {
            let currentPage = Number(this.state.currentPage);
            const {totalPages} = this.state;
            if(currentPage === totalPages) return null;
            currentPage+=1;
            this.setState({currentPage}, () =>{
                getUsers(this.controller.signal).then(res=>this.setState({Users: res}))
            })
        }
        const prevPage = () => {
            let currentPage = Number(this.state.currentPage);
            if(currentPage === 1) return null;
            currentPage -= 1;
            this.setState({currentPage}, () => {
                getUsers(this.controller.signal).then(res=>this.setState({Users: res}))
            })
        }
        
        return (
            <article className='container'>
                <h3 className='mt-3'>Admin</h3>
                <div className='row'>
                    <div className='col-12'>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames(`p-2 p-sm-4 p-md-5`, { active: activeTab === '1' })}
                                    onClick={() => { this.toggleTab('1'); }}
                                    style={{cursor: "pointer"}}
                                >
                                    Pending
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames(`p-2 p-sm-4 p-md-5`, { active: activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}
                                    style={{cursor: "pointer"}}
                                >
                                    Approved
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames(`p-2 p-sm-4 p-md-5`, { active: activeTab === '3' })}
                                    onClick={() => { this.toggleTab('3'); }}
                                    style={{cursor: "pointer"}}
                                >
                                    Rejected
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames(`p-2 p-sm-4 p-md-5`, { active: activeTab === '4' })}
                                    onClick={() => { this.toggleTab('4'); }}
                                    style={{cursor: "pointer"}}
                                >
                                    Banned
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                            {/*pending.length
                            ?*/}<><Row>
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
                                                    {pending.map(status => {
                                                        return ( 
                                                            <tr key={status.id}>
                                                                <th scope="row">{status.id}</th>
                                                                <td>{status.alias}</td>
                                                                <td>{status.email}</td>
                                                                <td>{status.status}</td>
                                                                <td><button className='btn btn-success col'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                                    </svg>
                                                                </button>
                                                                <button className='btn btn-danger col'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                                    </svg>
                                                                </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </Col>
                                </Row>
                                <Paginated />
                                </>
                            {/*} : <div className='text-center mt-4'>No hay elementos que mostrar</div>}*/}

                            </TabPane>
                            <TabPane tabId="2">
                            {/*approved.length
                            ?*/}  <><Row>
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
                                                        {approved.map(status => {
                                                            return ( 
                                                                <tr key={status.id}>
                                                                    <th scope="row">{status.id}</th>
                                                                    <td>{status.alias}</td>
                                                                    <td>{status.email}</td>
                                                                    <td>{status.status}</td>
                                                                    <td><Button className='btn col' color='primary' onClick={() => this.toggleShow()}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-light" viewBox="0 0 16 16">
                                                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
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
                                <Paginated paginate={paginate} prevPage={prevPage} nextPage={nextPage} indexOfFirstPost={indexOfFirstPost} postPerPage={postPerPage} pagesRemaining={pagesRemaining} itemsRemaining={itemsRemaining}/>
                                </>
                            {/*}: <div className='text-center mt-4'>No hay elementos que mostrar</div>}*/}
                            </TabPane>
                            <TabPane tabId="3">
                            {/*rejected.length
                            ? */}  <><Row>
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
                                                {rejected.map(status => {
                                                    return ( 
                                                        <tr key={status.id}>
                                                            <th scope="row">{status.id}</th>
                                                            <td>{status.alias}</td>
                                                            <td>{status.email}</td>
                                                            <td>{status.status}</td>
                                                            <td><button className='btn btn-primary col'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-light" viewBox="0 0 16 16">
                                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                                </svg>
                                                            </button></td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </Col>
                                </Row>
                                <Paginated />
                                </>
                            {/*}: <div className='text-center mt-4'>No hay elementos que mostrar</div>}*/}
                            </TabPane>
                            <TabPane tabId="4">
                            {/*banned.length
                            ? */}  <><Row>
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
                                                            <td><button className='btn btn-primary col'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-light" viewBox="0 0 16 16">
                                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                                </svg>
                                                            </button></td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </Col>
                                </Row>
                                <Paginated />
                                </>
                           {/* : <div className='text-center mt-4'>No hay elementos que mostrar</div>}*/}
                            </TabPane>
                        </TabContent>
                        <ModalAdminManager 
                            open={show}
                            onToggleModal={()=> this.setState({show: !show})}
                            handleChange={this.handleChange}
                            catchUser={this.catchUser}
                        />
                    </div>
                </div>
            </article>
        );
        
    }
}

export default Admin;