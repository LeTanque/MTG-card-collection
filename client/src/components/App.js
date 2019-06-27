import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Navigation/Home.jsx';
import NavBar from './Navigation/NavBar.jsx';
import RandomCard from './Cards/RandomCard.jsx';
import CardSearch from './Cards/CardSearch.jsx';
import CardsContainer from './Cards/CardsContainer.jsx';



function getRandomNumber(min, max) {
  const random = Math.random() * (max - min) + min;
  return Math.floor(random)
}



class App extends Component {
  state = {
    baseURL:`https://api.magicthegathering.io/v1/sets/rna/booster`,
    // baseURL:`https://api.magicthegathering.io/v1/cards?page=1&pageSize=50`,
    cardsURL:`/cards?page=`,
    cardsPageNumber:`1`,
    randomCardUrl:`https://api.magicthegathering.io/v1/cards/${getRandomNumber(1, 1000)}`,
    randomCard:{},
    sampleCard:{"name":"Plains",cmc:0,colors:[], colorIdentity:["white"], type:"Basic Land — Plains",imageUrl:"http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=8374&type=card" },
    allCards:[],
    location:`rna`
  }


  componentDidMount() {
    // this.getCards(this.state.baseURL + this.state.cardsURL + this.state.cardsPageNumber);
    this.getCards(this.state.baseURL);
    this.getCard(this.state.randomCardUrl);
    // console.log(this.state.randomCardUrl)
    // this.getCardsSDK()
  }


  getCards = URL => {
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
          path='/allcards'
          render={() => (
            <CardsContainer 
              allCards={this.state.allCards} 
              getCardsSDK={this.getCardsSDK}
              // goToNextPage={this.goToNextPage}
            />
          )}
        />


        <Route 
          path='/randomcard'
          render={() => (
            <RandomCard 
              randomCard={this.state.randomCard}
            />
          )}
        />

        <Route 
          path='/cardsearch'
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

