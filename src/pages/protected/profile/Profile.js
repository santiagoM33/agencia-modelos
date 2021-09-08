import React from 'react';
import ProfileProvider from '../../../context/ProfileContext';
import Navigation from './components/Navigation'
import ProfileContent from './pages/ProfileContent';

class Profile extends React.Component {
    state = {}

    showProfile = () => {
        const { user } = this.props;
        if (user.roleId === 1 || user.roleId === 2) {
            return (
                <ProfileProvider>
                    <Navigation user={user}/>
                    <ProfileContent />
                </ProfileProvider>
            )
        } else {
            return <div>Desde Profile Normal</div>
        }
    }

    render() {
        //console.log('Props: ', this.props)
        return (
            <React.Fragment>
                {this.showProfile()}
            </React.Fragment>
        );
    }
}

export default Profile;