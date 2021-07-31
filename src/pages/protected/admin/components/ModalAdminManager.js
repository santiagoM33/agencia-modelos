import React from 'react';
//import PropTypes from 'prop-types';
//import { withRouter } from 'react-router-dom';
import ModalAdmin from './ModalAdmin';

class ModalAdminManager extends React.Component {
    static propTypes = {
        //open: React.PropTypes.bool,
        //onToggleModal: React.PropTypes.func,
    }
    
    static defaultProps = {
        open: false,
        onToggleModal: () => { }
    }

    state = { 
        //users: [],
        modal: false
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    render() { 
        const {onToggleModal, open} = this.props;
        const {modal} = this.state;
        if(!modal) return null;

        return (
            <ModalAdmin 
                open={open} 
                onToggleModal={onToggleModal}
            />
         );
    }
}
 
export default ModalAdminManager;