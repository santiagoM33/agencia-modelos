import React from 'react';
import {Link} from 'react-router-dom';

const Navegation = (props) => {
    const {user} = props;
    return ( 
        <nav className='col-12 d-flex justify-content-around'>
            <Link to={'/profile'}>Profile</Link>
            <Link to={`/escorts/${user.id}`}>Editar</Link>
        </nav>
     );
}
 
export default Navegation;