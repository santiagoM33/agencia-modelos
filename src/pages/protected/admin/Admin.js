import React from 'react';
import './Admin.css';
import { getUsers } from '../../../services/connect';
import TableUsers from './components/TableUsers';

class Admin extends React.Component {
    state = {
        modal: false,
        currentPage: 1,
        postPerPage: 5,
        totalPages: 0,
        totalItems: 0,
        loading: true,
        usersAdmin: []
    }

    controller = new AbortController();
    
    componentDidMount(){
        getUsers(this.controller.signal).then(res=>this.setState({usersAdmin: res.data, loading: false}))
    }

    /*--------- MODAL------- */
    toggleModal = () => {
        this.setState({modal: !this.state.modal})
    }

    handleChange = e =>{
        e.persist();
        this.setState({form:{...this.state.form, [e.target.name]: e.target.value}})
    }
    
    /*----------------------- */
    /*----------------------- */
    //Verificar como mejorar esto
    //componentWillUnmount(){this.controller.abort()}

    render() {
        const { user, users } = this.props;
        const { loading } = this.state;
        if ( !user || !users.data ) return null;
        
       

        /* PAGINATION */
       

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

        /*----------------------- */
        /*----------------------- */        
        return (
            <article className='container'>
                <h3 className='mt-3'>Admin</h3>
                <TableUsers users={this.state.usersAdmin} modal={this.state.modal} toggleModal={this.toggleModal} />
            </article>
        );
        
    }
}

export default Admin;