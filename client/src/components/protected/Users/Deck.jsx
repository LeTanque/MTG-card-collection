import React from 'react'

const Deck = props => {
    return (
        <>
            <h3>{props.deck.name}</h3>
            <p>{props.deck.description}</p>
        </>
    );
}

export default Deck
