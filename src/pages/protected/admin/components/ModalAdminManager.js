import React from 'react';
//import { withRouter } from 'react-router-dom';
import ModalAdmin from './ModalAdmin';

class ModalAdminManager extends React.Component {
    static propTypes = {
        //open: React.PropTypes.bool,
        //onToggleModal: React.PropTypes.func
    }
    
    static defaultProps = {
        open: false,
        onToggleModal: () => { }
    }

    state = { 
        
    }

    render() { 
        const {onToggleModal, open} = this.props;

        return (
            <ModalAdmin 
                open={open} 
                onToggleModal={onToggleModal}
            />
         );
    }
}
 
export default ModalAdminManager;