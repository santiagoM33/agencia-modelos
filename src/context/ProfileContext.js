import React from 'react';
import { getServices } from '../services/connect'

export const ProfileContext = React.createContext()

class ProfileProvider extends React.Component {
    state = { 
        services: []
    }
    
    controller = new AbortController();

    componentDidMount(){
        getServices(this.controller.signal).then(services=>this.setState({services: services.data}))
    }

    componentWillUnmount(){
        this.controller.abort()
    }

    render() { 
        const {services} = this.state;
        return ( 
            <ProfileContext.Provider value={{
                services
            }}>
                {this.props.children}
            </ProfileContext.Provider>
         );
    }
}
 
export default ProfileProvider;