import React, { Component } from 'react';
import { 
    GoPlus, 
    GoHeart,
    GoX,
    // GoDiffAdded,
    // GoLinkExternal
} from 'react-icons/go';
import { Keyrune } from "@saeris/react-keyrune";


class Card extends Component {
    state = {
        cardObject:{},
        cardModal: false
    }

    selectCard = event => {
        event.preventDefault();
        console.log(this.props.card)
        this.setState({
            cardObject:this.props.card
        })
    }

    addCardToCollection = () => {

    }

    upperCaseThis = thing => {
        return thing.toLowerCase();
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
        // console.log(this.state.cardObject)
        if(this.state.cardModal) {
            return (
                <section className="card-modal">
                    <GoX 
                        className="modal-close" 
                        onClick={this.toggleCard}
                    />
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
                        <img 
                            src={this.props.card.imageUrl} 
                            alt={this.props.card.name}  
                        />
                        <div className={this.collectionView()}>
                            <h4>
                                {this.props.card.name}
                            </h4>
                            <br />
                            {this.props.card.type}
                            <br />
                            {this.props.card.text}
                            <br />
                            {this.props.card.flavor}
                            <br />
                            <Keyrune 
                                // gradient 
                                // foil
                                fixed
                                set={this.upperCaseThis(this.props.card.set)}
                                rarity={this.upperCaseThis(this.props.card.rarity)} 
                                size="2x"
                                className="set-icon"
                            />
                            {this.props.card.setName}
                        </div>

                        <div className={this.buttonShow()} >
                            <GoHeart onClick={this.selectCard} className="button-heart" />
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

