import React from 'react';
import { getUsers } from '../services/connect';

export const AdminContext = React.createContext();

class AdminProvider extends React.Component {
    state = {
        pending: {},
        currentPagePending: 0,
        limitPending: 5,
        offsetPending: 0,
        approved: {},
        currentPageApproved: 0,
        limitApproved: 5,
        offsetApproved: 0,
        rejected: {},
        currentPageRejected: 0,
        limitRejected: 5,
        offsetRejected: 0,
        banned: {},
        currentPageBanned: 0,
        limitBanned: 5,
        offsetBanned: 0,
        loading: true
    }

    controller = new AbortController();

    getUserPending = () => {
        const data = {
            status: 'pending',
            limit: this.state.limitPending,
            offset: this.state.offsetPending
        }
        getUsers(this.controller.signal, data).then(pending => this.setState({ pending, loading: false }))
    }

    getUserApproved = () => {
        const data = {
            status: 'approved',
            limit: this.state.limitApproved,
            offset: this.state.offsetApproved
        }
        getUsers(this.controller.signal, data).then(approved => this.setState({ approved, loading: false }))
    }

    getUserRejected = () => {
        const data = {
            status: 'rejected',
            limit: this.state.limitRejected,
            offset: this.state.offsetRejected
        }
        getUsers(this.controller.signal, data).then(rejected => this.setState({ rejected, loading: false }))
    }

    getUserBanned = () => {
        const data = {
            status: 'banned',
            limit: this.state.limitBanned,
            offset: this.state.offsetBanned
        }
        getUsers(this.controller.signal, data).then(banned => this.setState({ banned, loading: false }))
    }

    componentDidMount() {
        this.getUserPending()
        this.getUserApproved()
        this.getUserRejected()
        this.getUserBanned()
    }

    /* ----------------- PAGINATE SECTION  --------------------- */

    setPaginatePending = (currentPagePending, offsetPending) => this.setState({currentPagePending, offsetPending}, () => {
        this.getUserPending()
    })

    setPaginateApproved = (currentPageApproved, offsetApproved) => this.setState({currentPageApproved, offsetApproved}, () => {
        this.getUserApproved()
    })

    setPaginateRejected = (currentPageRejected, offsetRejected) => this.setState({currentPageRejected, offsetRejected}, () => {
        this.getUserRejected()
    })

    setPaginateBanned = (currentPageBanned, offsetBanned) => this.setState({currentPageBanned, offsetBanned}, () => {
        this.getUserBanned()
    })


    componentWillUnmount(){
        //this.controller.abort()
    }


    render() {
        const { setPaginatePending, setPaginateApproved, setPaginateRejected, setPaginateBanned, 
            getUserPending, getUserApproved, getUserRejected, getUserBanned } = this;
        const { pending, currentPagePending, limitPending, offsetPending, 
            approved, currentPageApproved, limitApproved, offsetApproved,
            rejected, currentPageRejected, limitRejected, offsetRejected,
            banned, currentPageBanned, limitBanned, offsetBanned } = this.state;
        return (
            <AdminContext.Provider value={{
                pending,
                currentPagePending,
                limitPending,
                offsetPending,
                getUserPending,
                approved,
                currentPageApproved,
                limitApproved,
                offsetApproved,
                getUserApproved,
                rejected,
                currentPageRejected,
                limitRejected,
                offsetRejected,
                getUserRejected,
                banned,
                currentPageBanned,
                limitBanned,
                offsetBanned,
                getUserBanned,
                setPaginatePending,
                setPaginateApproved,
                setPaginateRejected,
                setPaginateBanned
            }}>
                {this.props.children}
            </AdminContext.Provider>
        );
    }
}

export default AdminProvider;