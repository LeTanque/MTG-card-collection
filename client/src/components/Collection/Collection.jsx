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
        .get(`${process.env.REACT_APP_DB_BASE}/cards`)
        // .get("http://localhost:3333/cards")
        .then(results=>{
            // console.log("Collection CDM results: ", results)
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

    removeCardFromCollection = cardMultiId => {
        axios
        .delete(`${process.env.REACT_APP_DB_BASE}/cards/${cardMultiId}`) // Production call
        // .delete(`http://localhost:3333/cards/${cardMultiId}`) // Dev call
        .then(response => {
            // console.log("remove response", response.data.card)
            const newCollection = this.state.collection.filter(card => card.multiverseid !== response.data.card.multiverseid)
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

