import React from 'react';
//import './ProfileContent.css';
import { ProfileContext } from '../../../../context/ProfileContext';

class ProfileContent extends React.Component {
    static contextType = ProfileContext;
    state = {}
    render() {
        const { services } = this.context;
        //console.log('Servicios: ', services)
        return (
            <div className="text-center mt-3">
                <img className="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
                <h2>Heading</h2>
                <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
                {/*<p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>*/}
            </div>
        );
    }
}

export default ProfileContent;