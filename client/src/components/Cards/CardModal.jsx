import React from 'react';
import { 
    GoX,
    // GoTrashcan,
    // GoDiffAdded,
    // GoLinkExternal
} from 'react-icons/go';




const CardModal = props => {
    return (
        <section className="card-modal" onClick={props.toggleCard}>
            <GoX className="modal-close" />
            <img 
                // src={props.card.imageUrl}
                src={props.cardImage()}
                alt={props.card.name}  
            />
            <section className="modal-card-info">
                <h5>{props.card.name}</h5>
                <p>{props.card.type}</p>
                <p>{props.card.text}</p>
            </section>
        </section>
    );
}



export default CardModal


