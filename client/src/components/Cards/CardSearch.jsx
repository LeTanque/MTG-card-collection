import React, { Fragment, Component } from 'react';
import mtg from 'mtgsdk';
import Card from './Card.jsx';
import CardStatus from './CardStatus.jsx';



class CardSearch extends Component {
    state = {
        cardSearchResults:[],
        cardsWithPictures:[],
        searchResultPlaceholder:'Search for cards',
        inputCardName:'',
        status:null
    }

    findCard = (searchName, searchSubtype, searchSet, searchColors, searchPage) => {
        mtg.card
        .where({
            name: searchName,
            subtypes: searchSubtype,
            set: searchSet,
            colors: searchColors,
            page: searchPage,
        })
        .then(results => {
            if(!searchName && !searchSubtype && !searchSet && !searchColors && !searchPage) {
                this.setState({
                    searchResultPlaceholder:'Please try again!',
                })
                return;
            }
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
                    inputCardName:''
                })
                this.removeCardsWithNoPics();
            }
        })
        .catch(error => {
            this.setState({
                searchResultPlaceholder:'Error fetching results!',
                inputCardName:''
            })
            console.log(error)
        })
    }


    removeCardsWithNoPics = () => {
        const cardsWithPictures = this.state.cardSearchResults.filter(cardObject => cardObject.imageUrl)
        let cardOrCards = 'card';
        if (cardsWithPictures.length > 1) { cardOrCards='cards' };
        this.setState({
            cardsWithPictures:cardsWithPictures,
            searchResultPlaceholder:`Found ${this.state.cardSearchResults.length} cards, displaying ${cardsWithPictures.length} ${cardOrCards}.`,
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
        this.findCard(this.state.inputCardName);
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
                        <button className="btn-dark" onClick={this.submitSearch}>Search</button>
                    </form>
                </section>

                <section className="cards-container">

                    <div className="card-search-placeholder">
                        {this.state.searchResultPlaceholder}
                    </div>
                    
                    {this.props.status ? (<CardStatus status={this.props.status} />) : null}

                    {this.state.cardsWithPictures.map(card => {
                        return (
                            <Fragment key={card.id}>
                                <Card 
                                    card={card}
                                    status={this.props.status}
                                    statusCheck={this.props.statusCheck}
                                />
                            </Fragment>
                        )
                    })}
                </section>
            </>
        );
    }
}


export default CardSearch

