import React, { Component } from 'react';
import CardContainer from './CardContainer.jsx';


class App extends Component {
  state = {
    baseURL:`https://api.magicthegathering.io/v1`,
    cardsURL:`/cards?page=`,
    cardsPageNumber:`1`,
    allCards:[]
  }

  componentDidMount() {
    this.getCards(this.state.baseURL + this.state.cardsURL + this.state.cardsPageNumber);
  }

  getCards = URL => {
    // At a high level we are calling an API to fetch some mtg card data.
    // We then take that data and set it to our state.
    fetch(URL)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(data => {
      const cardsWithImage = data.cards.filter(card => card.imageUrl);
      this.setState({ allCards:cardsWithImage });
    })
    .catch(err => {
      throw new Error(err);
    });
  };


  render() {
    // console.log(this.state.allCards)
    if(this.state.allCards.length === 0) {
      return (
        <>
          <h1>Loading...</h1>
        </> 
      )
    } else {

      return (
        <>
          <CardContainer allCards={this.state.allCards} />
        </>
      );

    }
  }
}

export default App

