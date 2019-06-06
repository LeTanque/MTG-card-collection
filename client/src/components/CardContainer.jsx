import React, { Fragment, Component } from 'react'

class CardContainer extends Component {

    render() {
        // console.log(this.props)
        return (
            <section className="cards-container">
                {this.props.allCards.map(eachCard => 
                    (
                        <Fragment key={eachCard.id}>
                            <div className="card">
                                <img src={eachCard.imageUrl} />
                                <p></p>
                            </div>
                        </Fragment>
                    ))
                }
            </section>
        );
    }
}


export default CardContainer

