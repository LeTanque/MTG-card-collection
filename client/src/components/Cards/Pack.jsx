import React, { Fragment } from 'react'
import Card from './Card.jsx';
import Loader from 'react-loader-spinner';



class Pack extends React.Component {
    state = {
        status:null
    }

    statusCheck = status => {
        this.setState({
            status:status
        })
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

                    <span className={this.state.status === null ? "display-none" : "card-action-status"}>
                        {this.state.status}
                    </span>

                    {this.props.allCards.map(eachCard => 
                        (
                            <Fragment key={eachCard.id}>
                                <Card 
                                    card={eachCard}
                                    statusCheck={this.statusCheck}
                                />
                            </Fragment>
                        ))
                    }
                </section>
            </>
        );
    }
}

export default Pack
