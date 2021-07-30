import React from 'react';

const HeaderCard = props => {
    return (
        <div className={`card text-${props.textColor} bg-${props.bgColor} col-12 col-sm-4 col-md-3`}>
            <div className="card-header">{props.cardHeader}</div>
            <div className="card-body">
                <h5 className="card-title">{props.cardTitle}</h5>
                <p className="card-text">{props.cardText}</p>
            </div>
        </div>
    );
}

export default HeaderCard;