import React from 'react';
import Pencil from './icon/Pencil';
import Trash from './icon/Trash';

class Users extends React.Component {
    render() {
        const {service} = this.props;
        return (
            <>
                <tr>
                    <th scope="row">{service.name}</th>
                    <td>{service.description}</td>
                    <td className='text-center'>
                        <Trash id={service.id}/>
                        <Pencil userId={service.id}/>
                    </td>
                </tr>
            </>
        )
    }
}

export default Users;