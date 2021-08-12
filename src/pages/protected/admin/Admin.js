import React from 'react';
import './Admin.css';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
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
    }

    setActiveTab = tab => this.setState({ activeTab: tab })

    toggleTab = tab => {
        if (this.state.activeTab !== tab) this.setActiveTab(tab)
    }


    /*--------- MODAL------- */
    toggleModal = () => this.setState({ modal: !this.state.modal })

    handleChange = e => {
        e.persist();
        this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } })
    }

    /*----------------------- */
    /*----------------------- */
    //Verificar como mejorar esto
    //componentWillUnmount(){this.controller.abort()}

    render() {
        //const { setActiveTab } = this;
        const { user, users, loading, 
            currentPagePending, currentPageApproved, currentPageRejected, currentPageBanned, 
            limitApproved, limitPending, limitRejected, limitBanned,
            getUserApproved, getUserPending, getUserRejected, getUserBanned,
            setPaginateApproved, setPaginatePending, 
            setPaginateRejected, setPaginateBanned } = this.props;
        if (!user || !users) return null;
        const { pending, approved, rejected, banned } = users;
        const { activeTab } = this.state;
        
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
                                    style={{ cursor: "pointer" }}
                                >
                                    Pending
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames(`p-2 p-sm-4 p-md-5`, { active: activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}
                                    style={{ cursor: "pointer" }}
                                >
                                    Approved
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames(`p-2 p-sm-4 p-md-5`, { active: activeTab === '3' })}
                                    onClick={() => { this.toggleTab('3'); }}
                                    style={{ cursor: "pointer" }}
                                >
                                    Rejected
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames(`p-2 p-sm-4 p-md-5`, { active: activeTab === '4' })}
                                    onClick={() => { this.toggleTab('4'); }}
                                    style={{ cursor: "pointer" }}
                                >
                                    Banned
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Pending pending={pending}
                                         loading={loading} 
                                         currentPage={currentPagePending} 
                                         limit={limitPending} 
                                         getUserPending={getUserPending}
                                         setPaginatePending={setPaginatePending} 
                                />
                            </TabPane>
                            <TabPane tabId="2">
                                <Approved approved={approved} 
                                          loading={loading} 
                                          currentPage={currentPageApproved} 
                                          limit={limitApproved} 
                                          getUserApproved={getUserApproved}
                                          setPaginateApproved={setPaginateApproved}
                                />
                            </TabPane>
                            <TabPane tabId="3">
                                <Rejected rejected={rejected}
                                          loading={loading} 
                                          currentPage={currentPageRejected} 
                                          limit={limitRejected} 
                                          getUserPending={getUserRejected}
                                          setPaginatePending={setPaginateRejected} 
                                />
                            </TabPane>
                            <TabPane tabId="4">
                                <Banned banned={banned}
                                        loading={loading} 
                                        currentPage={currentPageBanned} 
                                        limit={limitBanned} 
                                        getUserPending={getUserBanned}
                                        setPaginateBanned={setPaginateBanned} 
                                />
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            </article>
        );

    }
}

export default Admin;