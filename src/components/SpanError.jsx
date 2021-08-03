import React from 'react'

const SpanError = (props) => {
    return ( 
        <small id={props.id} className={props.styles}>{props.children}</small>
     );
}
 
export default SpanError;