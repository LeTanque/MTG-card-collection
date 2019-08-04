import React, { Component } from 'react';

import axios from 'axios';
import CardModal from './CardModal.jsx';




class Card extends Component {
    state = {
        cardObject:{},
        cardModal:false,
    }


    addCardToCollection = () => {
        axios
        .post(`${process.env.REACT_APP_HEROKU_ADDRESS}/cards`, this.props.card)
        // .post("http://localhost:3333/cards", currentCard)
        .then(() => {

            this.setState({
                cardObject:this.props.card,
                cardModal:false
            })
            
            const statusUpdate = `Added ${this.props.card.name} to your collection!`
            this.props.statusCheck(statusUpdate)
        })
        .catch(error => {
            console.log("addCard error:  ", error)

            const statusUpdate = `Error adding ${this.props.card.name}!`
            this.props.statusCheck(statusUpdate)
        })
    }

    toggleCard = () => {
        this.setState({
            cardModal: !this.state.cardModal
        })
    }

    cardSize = () => {
        if (this.props.cardInCollection) {
            return "card-in-collection"
        }
        return "card"
    }
    
    cardImage = () => {
        if(this.props.card.imageUrl) {
            return `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this.props.card.multiverseid}&type=card`
        }
        return `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card`
    }

    render () {
        if(this.state.cardModal) {
            return (
                <CardModal 
                    toggleCard={this.toggleCard}
                    card={this.props.card}
                    cardImage={this.cardImage}
                    removeCardFromCollection={this.props.removeCardFromCollection}
                    cardInCollection={this.props.cardInCollection}
                    addCardToCollection={this.addCardToCollection}
                />
            )
        }
        return (
            <>
                <section className={this.cardSize()}>

                    <div className="card-img-container">
                        <img 
                            src={this.cardImage()}
                            alt={this.props.card.name}
                            onClick={this.toggleCard}
                            
                        />
                    </div>

                </section>
            </>
        );
    }
}


export default Card

