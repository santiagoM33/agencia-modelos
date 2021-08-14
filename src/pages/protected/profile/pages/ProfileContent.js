import React from 'react';
//import './ProfileContent.css';
import { ProfileContext } from '../../../../context/ProfileContext';

class ProfileContent extends React.Component {
    static contextType = ProfileContext;
    state = {}
    render() {
        const { services } = this.context;
        console.log(services[0])
        return (
            <div className="container mt-3">
                
            </div>
        );
    }
}

export default ProfileContent;