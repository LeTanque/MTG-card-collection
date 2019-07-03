import React, { Fragment } from 'react'
import Card from './Card.jsx';
import Loader from 'react-loader-spinner';



const Pack = props => {



    if(!props.allCards) {
        return (
            <Fragment>
                <section className="loader">
                    Open a new pack!
                </section>
            </Fragment>
        )
    }

    else if(props.allCards.length === 0) {
        return (
            <Fragment>
                <section className="loader">
                    <Loader  type="Grid" color="#ffffff" height={80} width={80} />
                    <code>Loading...</code>
                </section>
            </Fragment>
        )
    }

    return (
        <>
            <section className="cards-container">
                {props.allCards.map(eachCard => 
                    (
                        <Fragment key={eachCard.id}>
                            <Card 
                                card={eachCard}
                            />
                        </Fragment>
                    ))
                }
            </section>
        </>
    );
}

export default Pack
