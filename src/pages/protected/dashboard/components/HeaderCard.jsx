import React from 'react';

const HeaderCard = props => {
    return (
        <div className={`Card text-${props.textColor} bg-${props.bgColor} Col-6`}>
            <div className="CardHeader">{props.cardHeader}</div>
            <div className="CardBody">
                <p className="card-text">{props.cardText}</p>
            </div>
        </div>
    );
}

export default HeaderCard;