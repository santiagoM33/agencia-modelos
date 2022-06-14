import React from 'react';
import Pencil from './icon/Pencil';

class Users extends React.Component {
    render() {
        const {user, modal} = this.props;
        let role;
        switch (user.roleId) {
            case 1:
                role = 'Admin';
                break;
            case 2:
                role = 'Escort';
                break;
            default:
                role = 'User';
                break;
        }
        return (
            <>
                <tr>
                    <th scope="row">{user.alias}</th>
                    <td>{role}</td>
                    <td>{user.status}</td>
                    <td className='text-center'>
                        <Pencil id={user.id}/>
                    </td>
                </tr>
            </>
        )
    }
}

export default Users;