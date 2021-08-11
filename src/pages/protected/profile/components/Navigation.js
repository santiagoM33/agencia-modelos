import React from 'react';
import {Link} from 'react-router-dom';

const Navegation = (props) => {
    const {user} = props;
    return ( 
        <nav className='col-12 col-md-8 d-flex justify-content-around'>
            <Link to={'/profile'}>Profile</Link>
            <Link to={`/escorts/${user.id}`}>Editar Profile</Link>
        </nav>
     );
}
 
export default Navegation;