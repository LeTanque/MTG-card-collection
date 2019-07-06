import React from 'react';
import { 
    GoX,
    GoTrashcan,
    // GoDiffAdded,
    // GoLinkExternal
} from 'react-icons/go';
import {
    // FaHeart,
    FaRegCheckSquare,
} from 'react-icons/fa';

import { Keyrune } from "@saeris/react-keyrune";



const CardModal = props => {

    const lowerCaseThis = thing => {
        if(thing) {
            return thing.toLowerCase()
        }
        return null
    }

    return (
        <section 
            className={props.cardInCollection ? "card-modal card-details" : "card-modal"}
            onClick={props.toggleCard}
        >
            <GoX className="modal-close" />
            <img 
                src={props.cardImage()}
                alt={props.card.name}  
            />
            <section className="modal-card-info">
                <h4>{props.card.name}</h4>
                
                <p className={props.card.type ? null : "display-none"}>
                    {props.card.type}
                </p>

                <p className={props.card.text ? null : "display-none"}>
                    {props.card.text}
                </p>
                
                <p className={props.card.flavor ? "italic" : "display-none"}>
                    {props.card.flavor}
                </p>
                
                <div className="set-icon-container">
                    <Keyrune 
                        gradient 
                        foil
                        fixed
                        set={lowerCaseThis(props.card.set)}
                        rarity={lowerCaseThis(props.card.rarity)} 
                        size="3x"
                        className="set-icon"
                    />
                    <p className={props.card.setName ? "bold" : "display-none"}>
                        {props.card.setName}
                    </p>
                </div>

                <span 
                    className={props.cardInCollection ? "modal-button card-delete" : "display-none"}
                    onClick={() => props.removeCardFromCollection(props.card.id)} 
                >
                    <GoTrashcan /> &nbsp; Remove from Collection
                </span>
                
                <span 
                    className={props.cardInCollection ? "display-none" : "modal-button card-add"} 
                    onClick={props.addCardToCollection}
                >
                    <FaRegCheckSquare /> &nbsp; Add to Collection
                </span>
            </section>
        </section>
    );
}


export default CardModal


