import React, { Fragment, Component } from 'react';
import mtg from 'mtgsdk';

import Card from './Card.jsx';
import CardStatus from './CardStatus.jsx';
import SearchForm from './SearchForm.jsx';



class CardSearch extends Component {
    state = {
        cardSearchResults:[],
        cardsWithPictures:[],
        searchResultPlaceholder:'Search for cards',
        nameInput:'',
        resultsPage:'',
        status:null
    }

    findCard = ({name, type, subtypes}) => {
        if(!name && !type && !subtypes) {
            this.setState({
                searchResultPlaceholder:'Please try again!',
            })
            return;
        }
        mtg.card
        .where({
            name: name,
            type: type,
            subtypes: subtypes,
            // set: set,
            // colors: colors,
            page: 0,
        })
        .then(results => {
            if(results.length === 0) {
                this.setState({
                    nameInput:'',
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
                    nameInput:''
                })
                this.removeCardsWithNoPics();
            }
        })
        .catch(error => {
            this.setState({
                searchResultPlaceholder:'Error fetching results!',
                nameInput:''
            })
            console.log(error)
        })
    }


    removeCardsWithNoPics = () => {
        const cardsWithPictures = this.state.cardSearchResults.filter(cardObject => cardObject.imageUrl)
        let cardOrCards = 'card';
        if (cardsWithPictures.length > 1) { cardOrCards='cards' };
        this.setState({
            cardsWithPictures,
            searchResultPlaceholder:`Found ${this.state.cardSearchResults.length} cards, displaying ${cardsWithPictures.length} ${cardOrCards}.`,
        })
    }


    submitSearch = (event, searchParams) => {
        event.preventDefault();
        this.setState({
            searchResultPlaceholder:'Searching...'
        })
        this.findCard(searchParams);
    }


    render() {
        return (
            <>  
                <SearchForm 
                    submitSearch={this.submitSearch}
                    sortingHat={this.props.sortingHat}
                    type={this.props.allTheTypes}
                />

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

