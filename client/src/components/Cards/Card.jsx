import React, { Component } from 'react';
import { 
    GoPlus, 
    GoHeart,
    GoX,
    GoTrashcan,
    // GoDiffAdded,
    // GoLinkExternal
} from 'react-icons/go';
import axios from 'axios';
import { Keyrune } from "@saeris/react-keyrune";


class Card extends Component {
    state = {
        cardObject:{},
        cardModal:false
    }


    addCardToCollection = () => {
        axios
        .post(`${process.env.REACT_APP_DB_BASE}/cards`, this.props.card)
        // .post(`http://localhost:3333/cards`, this.props.card)
        .then(response => {
            // console.log("addCard response:  ", response)
            console.log(process.env.REACT_APP_DB_BASE)
            this.setState({
                cardObject:this.props.card,
                cardModal:false
            })
        })
        .catch(error => console.log("addCard error:", error, "Likely, this card already exist in your collection"))
    }

    lowerCaseThis = thing => {
        if(thing) {
            return thing.toLowerCase()
        }
        return null
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
    
    buttonShow = () => {
        if (this.props.cardInCollection) {
            return "display-none"
        }
        return "card-button"
    }

    collectionView = () => {
        if (this.props.cardInCollection) {
            return "card-details"
        }
        return "display-none"
    }

    render () {
        if(this.state.cardModal) {
            return (
                <section className="card-modal" onClick={this.toggleCard}>
                    <GoX className="modal-close" />
                    <img 
                        src={this.props.card.imageUrl} 
                        alt={this.props.card.name}  
                    />
                </section>
            )
        }
        if(this.props.card.imageUrl) {
            return (
                <>
                    <section className={this.cardSize()}>
                        <div className="card-img-container">
                            <img 
                                src={this.props.card.imageUrl} 
                                alt={this.props.card.name}  
                            />
                        </div>
                        <div className={this.collectionView()}>
                            <h4>
                                {this.props.card.name}
                            </h4><br />
                            
                            <div>
                                {this.props.card.type}
                            </div><br />

                            <div>
                                {this.props.card.text}
                            </div><br />
                            
                            <div className="italic">
                                {this.props.card.flavor}
                            </div> <br />
                            
                            <Keyrune 
                                // gradient 
                                // foil
                                fixed
                                set={this.lowerCaseThis(this.props.card.set)}
                                rarity={this.lowerCaseThis(this.props.card.rarity)} 
                                size="2x"
                                className="set-icon"
                            />
                            <div className="bold">
                                {this.props.card.setName}
                            </div><br />

                            <GoTrashcan 
                                onClick={() => this.props.removeCardFromCollection(this.props.card.multiverseid)} 
                            />
                        </div>

                        <div className={this.buttonShow()} >
                            <GoHeart onClick={this.addCardToCollection} className="button-heart" />
                            <GoPlus onClick={this.toggleCard} />
                        </div>

                    </section>



                </>
            );
        }
        else {
            return (
                <></>
            );
        }
    }
}


export default Card

