import React, { Component } from 'react';
import mtg from 'mtgsdk';
// import axios from 'axios';
import Card from './Card.jsx';


class CardSearch extends Component {
    state = {
        cardSearchResults:[],
        cardName:'',
        cardImage:'',
        searchResultPlaceholder:'Search for cards',
        inputCardName:''
    }

    findCardByName = cardName => {
        mtg.card
        .where({
            name: cardName, 
            // language: 'english'
        })
        .then(results => {
            // console.log("These are the findCardByName results", results);
            if(results.length === 0) {
                this.setState({
                    inputCardName:'',
                    searchResultPlaceholder:'No results!'
                })
            }
            else {
                this.setState({
                    cardSearchResults:results,
                    searchResultPlaceholder:'',
                    inputCardName:''
                })
            }
        })
    }

    handleChanges = event => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    submitSearch = event => {
        event.preventDefault();
        this.setState({
            searchResultPlaceholder:"Searching..."
        })
        this.findCardByName(this.state.inputCardName);
    }


    render() {
        return (
            <>  
                <section className="search-form">
                    <form 
                        onSubmit={this.submitSearch}
                    >
                        <input 
                            type="text"
                            name="inputCardName"
                            placeholder="Input card name here"
                            onChange={this.handleChanges}
                            value={this.state.inputCardName}
                        />
                    </form>
                </section>

                <section className="cards-container">

                    <div className="card-search-placeholder">{this.state.searchResultPlaceholder}</div>

                    {this.state.cardSearchResults.map(card => {
                        return (
                            <React.Fragment key={card.id}>
                                <Card 
                                    card={card}
                                />
                            </React.Fragment>
                        )
                    })}

                </section>
            </>
        );
    }
}


export default CardSearch

