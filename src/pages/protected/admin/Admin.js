import React from 'react';
import './Admin.css';
import { getUsers, getUsersPagination } from '../../../services/connect';
import TableUsers from './components/TableUsers';
import Paginated from './components/Paginated';

class Admin extends React.Component {
    state = {
        currentPage: 1,
        limit: 5,
        offset: 0,
        totalItems: 0,
        loading: true,
        usersAdmin: [],
        pagesRemaining: 0
    }

    controller = new AbortController();
    
    componentDidMount(){
        getUsersPagination(this.state.limit, this.state.offset).then(res=>this.setState({usersAdmin: res.data, loading: false, pagesRemaining: res.pagesRemaining}))
    }

    handleChange = e =>{
        e.persist();
        this.setState({form:{...this.state.form, [e.target.name]: e.target.value}})
    }
    
    /*----------------------- */
    /*----------------------- */
    //Verificar como mejorar esto
    //componentWillUnmount(){this.controller.abort()}


    onPageChange = (currentPage, offset) => this.setState({currentPage, offset})

    render() {
        const { user, users } = this.props;
        //const { loading } = this.state;
        if ( !user || !users.data ) return null;
        
       console.log('Pages', this.state.pagesRemaining)

        /* PAGINATION */
          
            const {currentPage, pagesRemaining} = this.state;
            let totalPages = currentPage + pagesRemaining;

        /*----------------------- */
        /*----------------------- */   
        return (
            <article className='container'>
                <h3 className='mt-3'>Admin</h3>
                <TableUsers users={this.state.usersAdmin} />
                <Paginated
                    onPageChange={this.onPageChange} 
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </article>
        );
        
    }
}

export default Admin;