import React, { Component } from 'react';
import mtg from 'mtgsdk';
// import axios from 'axios';
import Card from './Card.jsx';


class CardSearch extends Component {
    state = {
        cardSearchResults:[],
        searchResultPlaceholder:'Search for cards',
        inputCardName:'',
        status:null
    }


    findCardByName = cardName => {
        mtg.card
        .where({
            name: cardName, 
            // language: 'english'
        })
        .then(results => {
            if(results.length === 0) {
                this.setState({
                    inputCardName:'',
                    searchResultPlaceholder:'No results!'
                })
            }
            if(results === null) {
                this.setState({
                    searchResultPlaceholder:'Searching...',
                })
            }
            else {
                this.setState({
                    cardSearchResults:results,
                    searchResultPlaceholder:`Found ${results.length} cards`,
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

    statusCheck = status => {
        this.setState({
            status:status
        })
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

                    <div className="card-search-placeholder">
                        {this.state.searchResultPlaceholder}
                    </div>
                    
                    <span className={this.state.status === null ? "display-none" : "card-action-status"}>
                        {this.state.status}
                    </span>

                    {this.state.cardSearchResults.map(card => {
                        return (
                            <React.Fragment key={card.id}>
                                <Card 
                                    card={card}
                                    status={this.state.status}
                                    statusCheck={this.statusCheck}
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

