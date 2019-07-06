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
        </section>
    );
}



export default CardModal


