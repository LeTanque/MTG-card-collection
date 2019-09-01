import React, { Fragment } from 'react'
import Loader from 'react-loader-spinner';

import Card from './Card.jsx';
import CardStatus from './CardStatus.jsx';


class Pack extends React.Component {

    render() {
        if(!this.props.packOfCards) {
            return (
                <section className="loader">
                    Open a new pack!
                </section>
            )
        }

        else if(this.props.packOfCards.length === 0) {
            return (
                <section className="loader">
                    <Loader  type="Grid" color="#ffffff" height={80} width={80} />
                    <code>Loading...</code>
                </section>
            )
        }

        return (
            <>
                <section className="cards-container">

                    {this.props.status ? (<CardStatus status={this.props.status} />) : null}

                    {this.props.packOfCards.map(eachCard => (
                        <Fragment key={eachCard.id}>
                            <Card 
                                card={eachCard}
                                statusCheck={this.props.statusCheck}
                            />
                        </Fragment>
                    ))}
                </section>
            </>
        );
    }
}

export default Pack
