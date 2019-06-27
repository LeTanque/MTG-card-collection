import React from 'react'

const Card = props => {
    if(props.card.imageUrl) {
        return (
            <img src={props.card.imageUrl} alt={props.card.name} />
        );
    }
    else {
        return (
            <></>
        );
    }
}

export default Card