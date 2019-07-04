import React, { Component } from 'react';
import { 
    // GoPlus, 
    // GoHeart,
    GoX,
    GoTrashcan,
    // GoDiffAdded,
    // GoLinkExternal
} from 'react-icons/go';
import {
    // FaHeart,
    FaRegCheckSquare,
} from 'react-icons/fa';
import {
    MdImage,
} from 'react-icons/md';
import axios from 'axios';
import { Keyrune } from "@saeris/react-keyrune";


class Card extends Component {
    state = {
        cardObject:{},
        cardModal:false,
        status:null
    }

    componentDidMount() {
        this.setState({
            status:this.props.status
        })
    }

    addCardToCollection = () => {
        axios
        .post(`${process.env.REACT_APP_DB_BASE}/cards`, this.props.card)
        // .post(`http://localhost:3333/cards`, this.props.card)
        .then(response => {
            console.log("addCard response:  ", response)
            const statusUpdate = `Added ${this.props.card.name} to your collection!`
            this.setState({
                cardObject:this.props.card,
                cardModal:false,
                status:statusUpdate
            })
            this.props.statusCheck(statusUpdate)
        })
        .catch(error => {
            const statusUpdate = `Error adding ${this.props.card.name}!`
            this.setState({
                status:statusUpdate
            })
            this.props.statusCheck(statusUpdate)
        })
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
                            </h4>
                            
                            <div>
                                {this.props.card.type}
                            </div>

                            <div className={this.props.card.text ? null : "display-none"}>
                                {this.props.card.text}
                            </div>
                            
                            <div className={this.props.card.flavor ? "italic" : "display-none"}>
                                {this.props.card.flavor}
                            </div>
                            
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
                            </div>

                            <div className="card-delete">
                                <GoTrashcan 
                                    onClick={() => this.props.removeCardFromCollection(this.props.card.multiverseid)} 
                                />
                            </div>

                        </div>

                        <div className={this.buttonShow()} >
                            <FaRegCheckSquare 
                                onClick={this.addCardToCollection} 
                                className="button-heart" 
                            />
                            <MdImage 
                                onClick={this.toggleCard} 
                                className="button-enlarge" 
                            />
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

