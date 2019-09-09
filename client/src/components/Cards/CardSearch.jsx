import React, { Fragment, Component } from 'react';
// import mtg from 'mtgsdk';

import Card from './Card.jsx';
import CardStatus from './CardStatus.jsx';
import SearchForm from './SearchForm.jsx';



class CardSearch extends Component {
    state = {
        nameInput:'',
        resultsPage:'',
        status:null
    }

    render() {
        return (
            <>  
                <SearchForm 
                    submitSearch={this.props.submitSearch}
                    sortingHat={this.props.sortingHat}
                    currentSearch={this.props.currentSearch}
                    // type={this.props.allTheTypes}
                />

                <section className="cards-container">

                    <div className="card-search-placeholder">
                        {this.props.searchResultPlaceholder}
                    </div>
                    
                    {this.props.status ? (<CardStatus status={this.props.status} />) : null}

                    {this.props.cardsWithPictures.map(card => {
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

