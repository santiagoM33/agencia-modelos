import React from 'react';
import Services from './Services';

class TableUsers extends React.Component {
    render() {
        const { services } = this.props;
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!services && services.map(user=> (
                        <Services key={user.id} services={services} />
                    )) }
                    
                </tbody>
            </table>
        )
    }
}

export default TableUsers;