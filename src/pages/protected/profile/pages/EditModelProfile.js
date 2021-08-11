import React from 'react';
import FormProfile from '../components/FormProfile';

class EditModelProfile extends React.Component {
    state = {  }
    render() { 
        const { data } = this.props.models;
        if(!data) return null;
        //const {escordId} = this.props.match.params;
        //const MODEL = data.find(el=>el.userId === Number(escordId));

        return ( 
            <FormProfile model={data[0]}/>
         );
    }
}
 
export default EditModelProfile;