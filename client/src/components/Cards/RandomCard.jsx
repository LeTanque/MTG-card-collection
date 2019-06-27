import React from 'react'




const RandomCard = props => {
    const card = props.randomCard
    // console.log(card)

    if (!card.imageUrl) {
        return (
            <h2>Loading...</h2>
        )
    }
    else if (card.imageUrl === undefined) {
        return (
            <h2>No image :(</h2>
        )
    }
    else {
        return (
            <section className="cards-container random-card">
                <div className="card">
                    <img src={card.imageUrl} alt={card.name} /> 
                </div>
            </section>
        );
    }
    

}


export default RandomCard

