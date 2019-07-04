import React, { Component } from 'react'
import axios from 'axios';
import Card from '../Cards/Card.jsx';


class Collection extends Component {
    state = {
        collection: [],
        collectionResultPlaceholder:"Collection loading",
        cardInCollection: true
    }

    componentDidMount() {
        axios
        .get("http://localhost:3333/cards")
        .then(results=>{
            console.log("Collection CDM results: ",results)
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

    render() {
        console.log(this.state)
        return (
            <section className="cards-container collection">
                {this.state.collection.map(card => (
                    <React.Fragment key={card.id}>
                        <Card 
                            card={card} 
                            cardInCollection={this.state.cardInCollection}
                        />
                    </React.Fragment>
                ))}

                <div className="card-search-placeholder">{this.state.collectionResultPlaceholder}</div>

            </section>
        );
    }
}



export default Collection

