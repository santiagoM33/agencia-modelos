import React from 'react'
import classNames from 'classnames'

const Hamburguer = (props) => {
    return ( 
        <button className={classNames('navbar-toggler ml-auto', {[`text-${props.color}`] : props.color})} type='button' data-toggle={props.toggle} data-target={props.target} aria-controls={props.controls} aria-expanded="false" aria-label="Toggle navigation" onClick={props.onBtnClose}>
            <span className='navbar-toggler-icon'></span>
        </button>
     );
}
 
export default Hamburguer;