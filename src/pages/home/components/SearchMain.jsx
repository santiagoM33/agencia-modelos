import React from 'react';
import Logo from './Logo';
import Search from './Search';

class SearchMain extends React.Component {
    state = {}
    render() {
        return (
            <div className='d-flex justify-content-center align-items-center'>
                <Logo name='Catalog'/>
                <Search />
            </div>
        );
    }
}

export default SearchMain;