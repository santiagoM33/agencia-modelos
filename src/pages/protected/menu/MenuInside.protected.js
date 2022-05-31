import React from 'react';

class MenuInside extends React.Component {
    state = {}
    render() {
        return (
            <sidebar>
                <a href='/profile'>Profile</a>
                <a href='/catalog'>Catalog</a>
                <a href='/signout'>SignOut</a>
            </sidebar>
        );
    }
}

export default MenuInside;