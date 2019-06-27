import React, { Component } from 'react';
import mtg from 'mtgsdk';
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
            console.log("These are the findCardByName results", results);
            if(results.length === 0) {
                this.setState({
                    inputCardName:'',
                    searchResultPlaceholder:'No results!'
                })
            }
            else {
                this.setState({
                    cardSearchResults:results,
                    // cardName:results[0].name,
                    // cardImage:results[0].imageUrl,
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
        this.findCardByName(this.state.inputCardName);
    }

    render() {

        return (
            <>
                {/* <h5>Search for MTG cards by name</h5> */}
                
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

                    {this.state.cardSearchResults.map(card => {
                        if(card.imageUrl) {
                            return (
                                <div 
                                key={card.multiverseid}
                                className="card"
                                >       
                                    <Card 
                                    card={card} 
                                    />
                                </div>
                            )
                        }
                        return (
                            <React.Fragment key={Math.random()}/>
                        )
                    }
                    )}

                    <div className="card-search-placeholder">{this.state.searchResultPlaceholder}</div>

                </section>
            </>
        );
    }
}


export default CardSearch

