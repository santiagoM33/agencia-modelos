import React from 'react';

export const AdminContext = React.createContext();

class AdminProvider extends React.Component {
    state = { 
        saludo: 'Desde Admin'
    }

    componentDidMount(){
        
    }

    
    
    

    render() { 
        return ( 
            <AdminContext.Provider value={{
                saludo
            }}>
                {this.props.children}
            </AdminContext.Provider>
         );
    }
}
 
export default AdminProvider;