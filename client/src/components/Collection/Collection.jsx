import React, { Component } from 'react'
import axios from 'axios';
import Card from '../Cards/Card.jsx';


class Collection extends Component {
    state = {
        collection: [],
        collectionResultPlaceholder:"Collection loading",
        cardInCollection: true,
        status: null
    }

    componentDidMount() {
        axios
        .get(`${process.env.REACT_APP_NODE_SERVER}/cards`)
        .then(results=>{
            console.log("Collection CDM results: ", results)
            console.log("React app node server base: ", process.env.REACT_APP_NODE_SERVER)
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
        .delete(`${process.env.REACT_APP_NODE_SERVER}/cards/${cardId}`) // Production call
        // .delete(`http://localhost:3333/cards/${cardId}`) // Dev call
        .then(response => {
            // console.log("remove response", response.data.card)
            const newCollection = this.state.collection.filter(card => card.id !== response.data.card.id)
            this.setState({
                collectionResultPlaceholder:`Removed ${response.data.card.name}`,
                collection:[...newCollection],
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <section className="cards-container collection">
                
                <div className="card-search-placeholder">
                    {this.state.collectionResultPlaceholder}
                </div>

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

