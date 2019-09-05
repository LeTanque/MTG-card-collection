import React from 'react'

const Decks = props => {
    console.log(props)
    return (
        <>
            <h1>Decks</h1>
            <h3>{props.deck.name}</h3>
            <p>{props.deck.description}</p>
        </>
    );
}

export default Decks;


