import React from 'react';
//import PropTypes from 'prop-types';
//import { withRouter } from 'react-router-dom';
import ModalAdmin from './ModalAdmin';

class ModalAdminManager extends React.Component {
    static propTypes = {
        //isOpen: React.PropTypes.bool,
        //onToggleModal: React.PropTypes.func,
    }
    
    static defaultProps = {
        isOpen: false,
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
        //const {toggleModal, isOpen} = this.props;
        const {modal, toggle} = this.state;
        if(!modal) return null;
        console.log('Props: ', this.props)
        return (
            <ModalAdmin 
                isOpen={modal} 
                ontoggleModal={toggle}
                onModal={modal}
            />
         );
    }
}
 
export default ModalAdminManager;