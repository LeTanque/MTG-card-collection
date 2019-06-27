import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Navigation/Home.jsx';
import NavBar from './Navigation/NavBar.jsx';
import RandomCard from './Cards/RandomCard.jsx';
import CardSearch from './Cards/CardSearch.jsx';
import RandomPack from './Cards/RandomPack.jsx';



function getRandomNumber(min, max) {
  const random = Math.random() * (max - min) + min;
  return Math.floor(random)
}



class App extends Component {
  state = {
    // baseURL:`https://api.magicthegathering.io/v1/cards?page=1&pageSize=50`,
    cardsURL:`/cards?page=`,
    cardsPageNumber:`1`,
    randomPackUrlRNA:`https://api.magicthegathering.io/v1/sets/rna/booster`,
    randomCardUrl:`https://api.magicthegathering.io/v1/cards/${getRandomNumber(1, 1000)}`,
    randomCard:{},
    sampleCard:{
      "name":"Plains",
      cmc:0,
      colors:[], 
      colorIdentity:["white"], 
      type:"Basic Land — Plains",
      imageUrl:"http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=8374&type=card" 
    },
    allCards:null,
    location:`rna`
  }


  componentDidMount() {
    this.getCard(this.state.randomCardUrl);

    // this.getCards(this.state.baseURL + this.state.cardsURL + this.state.cardsPageNumber);
    // console.log(this.state.randomCardUrl)
    // this.getCardsSDK()
  }


  // This method retrieves a random pack of cards
  getPackOfCards = URL => {
    // At a high level we are calling an API to fetch some mtg card data.
    // We then take that data and set it to our state.
    fetch(URL)
    .then(res => {
      // console.log(res);
      return res.json();
    })
    .then(data => {
      // console.log("this is the API data", data);
      const cardsWithImage = data.cards.filter(card => card.imageUrl);
      this.setState({ allCards:cardsWithImage });
    })
    .catch(err => {
      throw new Error(err);
    });
  };

  // This method triggers the above method when we click on the open pack button
  openPackOfCards = () => {
    this.getPackOfCards(this.state.randomPackUrlRNA);
  }


  getCard = URL => {
    fetch(URL)
    .then(res => {
      return res.json();
    })
    .then(data => {
      this.setState({ randomCard:data.card })
    })
    .catch(err => {
      throw new Error(err);
    })
  }


  getCardsSDK = () => {
  //   mtg.card  // This is basically the same thing as the fetch, only it uses the mtg sdk imported aboves
  //   .all({
  //     types: 'creature',
  //     colors: 'black',
  //     page: 100,
  //     pageSize: 3
  //   })
  //   .on('data', card => {
  //     console.log(card)
  //   })
  //   // .where({
  //   //   page:50,
  //   //   pageSize:50,
  //   //   set:"5ED",
  //   //   reserved: true
  //   // })
  //   // .then(cards => {
  //   //   const cardsWithImage = cards.filter(card => card.imageUrl); // Remove any cards that don't have an imageUrl
  //   //   this.setState({
  //   //     allCards:cardsWithImage
  //   //   })
  //   // })
  }



  goToNextPage = () => {
    // let currentPage = this.state.cardsPageNumber;
    // console.log('This is the current page:', currentPage);

    // this.setState({
    //   cardsPageNumber: ++currentPage
    // });
    
    // this.getCards(this.state.baseURL + this.state.cardsURL + this.state.cardsPageNumber);
  }


  render() {
    // console.log("App state allCards", this.state.allCards)
    return (
      <BrowserRouter>
        <NavBar />
        

        
        <Route 
          exact
          path='/'
          render={() => (
            <Home 
              randomCard={this.state.randomCard}
              randomCardImageUrl={this.state.randomCard.imageUrl}
            />
          )}
        />


        <Route 
          path='/random-pack-rna'
          render={() => (
            <RandomPack 
              allCards={this.state.allCards} 
              openPackOfCards={this.openPackOfCards}
              // getCardsSDK={this.getCardsSDK}
              // goToNextPage={this.goToNextPage}
            />
          )}
        />


        <Route 
          path='/random-card'
          render={() => (
            <RandomCard 
              randomCard={this.state.randomCard}
            />
          )}
        />

        <Route 
          path='/card-search'
          render={() => (
            <CardSearch 

            />
          )}
        />




      </BrowserRouter>
    );

  }
}

export default App

