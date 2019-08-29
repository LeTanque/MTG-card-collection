import React from 'react'



const CardStatus = props => {
    
    
    

    return (
        <>
            <div className={props.status === null ? "display-none" : "card-status-container"}>
                <span className="card-action-status">
                    {props.status}
                </span>
            </div>
        </>
    );
}


export default CardStatus


