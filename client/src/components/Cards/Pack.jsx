import React, { Fragment } from 'react'
import Loader from 'react-loader-spinner';

import Card from './Card.jsx';
import CardStatus from './CardStatus.jsx';


class Pack extends React.Component {
    state = {
        status:null
    }


    render() {
        if(!this.props.allCards) {
            return (
                <>
                    <section className="loader">
                        Open a new pack!
                    </section>
                </>
            )
        }

        else if(this.props.allCards.length === 0) {
            return (
                <>
                    <section className="loader">
                        <Loader  type="Grid" color="#ffffff" height={80} width={80} />
                        <code>Loading...</code>
                    </section>
                </>
            )
        }

        return (
            <>
                <section className="cards-container">

                    {this.props.status ? (<CardStatus status={this.props.status} />) : null}

                    {this.props.allCards.map(eachCard => (
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
