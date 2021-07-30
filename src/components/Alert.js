import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';



export const Alert = ({type, children}) => {
    return ( 
        
            <div className={classnames('alert',{
                [`alert-${type}`] : type
            })} 
                role="alert"
            >
            {children}</div>
        
        
     );
}

export const AlertLink = ({href, children}) => {
    return (
        <a href={href} className="alert-link">{children}</a>
    )
}

export const AlertHeading = ({children}) => {
    return (
        <h4 class="alert-heading">{children}</h4>
    )
}

export const AlertInfo = ({pos, children}) => {
    return (
        <p class={pos}>{children}</p>
        
    )
}

Alert.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf([
        'primary', 
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark'
    ])
};
