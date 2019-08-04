import React, { Component } from 'react'
import axios from 'axios';
import Card from '../Cards/Card.jsx';
import CardStatus from '../Cards/CardStatus.jsx';


class Collection extends Component {
    state = {
        collection: [],
        collectionResultPlaceholder:"Collection loading",
        cardInCollection: true,
    }

    componentDidMount() {
        axios
        .get(`${process.env.REACT_APP_HEROKU_ADDRESS}/cards`)
        .then(results=>{
            if(results.length === 0) {
                this.setState({
                    inputCardName:'',
                    collectionResultPlaceholder:'No results!'
                })
            }
            else {
                this.setState({
                    collection:[...results.data],
                    collectionResultPlaceholder:'',
                })
            }
        })
        .catch(error=>console.log(error))
    }

    removeCardFromCollection = cardId => {
        axios
        .delete(`${process.env.REACT_APP_HEROKU_ADDRESS}/cards/${cardId}`) // Production call
        .then(response => {
            const newCollection = this.state.collection.filter(card => card.id !== response.data.card.id)
            const collectionCount = this.state.collection.length
            this.setState({
                collectionResultPlaceholder:`${collectionCount} cards in collection`,
                collection:[...newCollection]
            })
            this.props.statusCheck(`Removed ${response.data.card.name}`)
        })
        .catch(error => console.log(error))
    }

    render() {
        // console.log("process.env server variable: ",process.env.REACT_APP_HEROKU_ADDRESS)
        return (
            <section className="cards-container collection">
                
                <div className="card-search-placeholder">
                    {this.state.collectionResultPlaceholder}
                </div>

                <CardStatus status={this.props.status} />

                {this.state.collection.map(card => (
                    <React.Fragment key={card.id}>
                        <Card 
                            card={card} 
                            cardInCollection={this.state.cardInCollection}
                            removeCardFromCollection={this.removeCardFromCollection}
                        />
                    </React.Fragment>
                ))}

            </section>
        );
    }
}



export default Collection

