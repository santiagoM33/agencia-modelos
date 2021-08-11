import React from 'react';
import { Table } from 'reactstrap';

class TableServices extends React.Component {
    state = {}
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Label</th>
                        <th>Icon</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Kisses</td>
                        <td>kisses</td>
                        <td>far fa-edit</td>
                        <td>Editar / Borrar</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>HEF</td>
                        <td>hef</td>
                        <td>far fa-search</td>
                        <td>Editar / Borrar</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Completa</td>
                        <td>completa</td>
                        <td>fas fa-pencil</td>
                        <td>Editar / Borrar</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default TableServices;