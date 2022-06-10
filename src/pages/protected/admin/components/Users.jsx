import React from 'react';
import Pencil from './icon/Pencil';

class Users extends React.Component {
    render() {
        const {user, modal} = this.props;
        return (
            <>
                <tr>
                    <th scope="row">{user.alias}</th>
                    <td>{user.roleId}</td>
                    <td>{user.status}</td>
                    <td className='text-center'>
                        <Pencil userId={user.id}/>
                    </td>
                </tr>
            </>
        )
    }
}

export default Users;