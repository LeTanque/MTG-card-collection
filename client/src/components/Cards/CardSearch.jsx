import React, { Component } from 'react';
import mtg from 'mtgsdk';



class CardSearch extends Component {
    state = {
        cardName:'',
        cardImage:'',
        inputCardName:'Swamp'
    }


    findCardByName = () => {
        mtg.card
        .where({
            name: `${this.state.inputCardName}`, 
            // language: 'english'
        })
        .then(results => {
            console.log("These are the findCardByName results", results);
            this.setState({
                cardName:results[0].name,
                cardImage:results[0].imageUrl,
            })
        })
    }
    
    componentDidUpdate() {
        
    }

    render() {

        return (
            <>
            <section className="search-bar">
                <button 
                    className="btn-dark"
                    onClick={ this.findCardByName() }
                >
                    Activate Search
                </button>

            </section>
            <section className="cards-container">

                <div className="card">
                    <img src={this.state.cardImage} alt={this.state.cardName} /> 
                </div>

            </section>
            </>
        );
    }
}


export default CardSearch

