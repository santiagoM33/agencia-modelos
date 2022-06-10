import React from 'react';
import Users from './Users';

class TableUsers extends React.Component {
    render() {
        const { users, modal } = this.props;
        return (
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=> (
                        <Users  key={user.id} user={user} modal={modal} toggleModal={this.props.toggleModal} />
                    )) }
                    
                </tbody>
            </table>
        )
    }
}

export default TableUsers;