import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import classnames from 'classnames';
import { getUsers } from '../../../services/connect';
import ModalAdminManager from './components/ModalAdminManager';

import Pending from './components/Pending';
import Approved from './components/Approved';
import Rejected from './components/Rejected';
import Banned from './components/Banned';

class Admin extends React.Component {
    state = {
        activeTab: '1',
        pending: [],
        approved: [],
        rejected: [],
        banned: [],
        modal: false,
        currentPage: 1,
        postPerPage: 5,
        totalPages: 0,
        totalItems: 0,
        loading: false
    }

    controller = new AbortController();
    
    componentDidMount(){
        getUsers(this.controller.signal).then(res=>this.setState({pending: res.data.filter(a=>a.status === 'pending')}))
        getUsers(this.controller.signal).then(res=>this.setState({approved: res.data.filter(a=>a.status === 'approved')}))
        getUsers(this.controller.signal).then(res=>this.setState({rejected: res.data.filter(a=>a.status === 'rejected')}))
        getUsers(this.controller.signal).then(res=>this.setState({banned: res.data.filter(a=>a.status === 'banned')}))
    }

    setActiveTab = tab => {
        this.setState({ activeTab: tab })
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) this.setActiveTab(tab)
    }


    /*--------- MODAL------- */
    toggleModal = () => {
        console.log('Change show')
        this.setState({modal: !this.state.modal})
    }

    handleChange = e =>{
        e.persist();
        this.setState({form:{...this.state.form, [e.target.name]: e.target.value}})
    }
    
    /*catchUser= user => {
        this.setState({form:{
            id: user.id, 
            alias: user.alias, 
            email: user.email, 
            status: user.status, 
            roleId: user.roleId}
        })
    }*/
    /*----------------------- */
    /*----------------------- */
    //Verificar como mejorar esto
    //componentWillUnmount(){this.controller.abort()}

    render() {
        const { user, users } = this.props;
        const { activeTab, modal, currentPage, postPerPage } = this.state;
        if (!user || !users.data || !activeTab) return null;
        
       

        /* PAGINATION */
        const {pending, approved, rejected, banned} = this.state;
        if (!pending || !approved || !rejected || !banned) return null;

        /*const paginate = pageNum => this.setState({currentPage: pageNum})
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
        }*/

        
        
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
                                <Pending pending={pending} toggleModal={this.toggleModal}/>
                            </TabPane>
                            <TabPane tabId="2">
                                <Approved approved={approved} toggleModal={this.toggleModal}/>
                            </TabPane>
                            <TabPane tabId="3">
                                <Rejected rejected={rejected} toggleModal={this.toggleModal}/>
                            </TabPane>
                            <TabPane tabId="4">
                                <Banned banned={banned} toggleModal={this.toggleModal}/>
                            </TabPane>
                        </TabContent>
                        <ModalAdminManager 
                            open={modal}
                            onToggleModal={this.toggleModal}
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