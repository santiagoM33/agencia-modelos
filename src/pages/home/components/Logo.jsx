import { Link } from 'react-router-dom';

const Logo = props =>  {
        return (
            <div className='col-6'>
                <Link to='/' className=' text-dark font-weight-normal text-decoration-none'>{props.name}</Link>
            </div>
        )
}

export default Logo;