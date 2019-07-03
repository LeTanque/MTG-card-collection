import React, { Component } from 'react';
import { GoDiffAdded } from 'react-icons/go';
import { Keyrune } from "@saeris/react-keyrune"


class Card extends Component {



    addCardToCollection = () => {
        // console.log("multiverseid running ", this.props.card.multiverseid);
        // console.log("imageUrl running ", this.props.card.imageUrl);
        // console.log("name running ", this.props.card.name);
    }
    
    upperCaseThis = thing => {
        return thing.toLowerCase();
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
        return null
    }

    collectionView = () => {
        if (this.props.cardInCollection) {
            return "card-details"
        }
        return "display-none"
    }

    render () {

        if(this.props.card.imageUrl) {
            return (
                <>
                    <div className={this.cardSize()}>
                        <img 
                            src={this.props.card.imageUrl} 
                            alt={this.props.card.name}  
                        />
                        <div className={this.collectionView()}>
                            <h4>
                                {this.props.card.name}
                            </h4>
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
                    </div>

                    <div className={this.buttonShow()} >
                        <GoDiffAdded onClick={this.addCardToCollection} />
                    </div>
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

