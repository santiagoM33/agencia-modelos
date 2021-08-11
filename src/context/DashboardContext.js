import React from 'react';
import axios from 'axios';

export const DashboardContext = React.createContext()

class DashboardProvider extends Component {
    state = { 
        saludo: 'Hola Mundo desde Dashboard'
     }
    render() { 
        const {saludo} = this.state;
        return ( 
            <DashboardContext.Provider value={{
                saludo
            }}>
                {this.props.children}
            </DashboardContext.Provider>
         );
    }
}
 
export default DashboardProvider;