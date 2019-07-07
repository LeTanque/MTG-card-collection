import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Navigation/Home.jsx';
import NavBar from './Navigation/NavBar.jsx';
import CardSearch from './Cards/CardSearch.jsx';
import RandomCard from './RandomCards/RandomCard.jsx';
import RandomPack from './RandomCards/RandomPack.jsx';
import AdminTools from './Admin/AdminTools.jsx';
import Collection from './Collection/Collection.jsx';


// Returns random numbers in a safe range for rendering cards
function getRandomNumber(min, max) {
  const random = Math.random() * (max - min) + min;
  return Math.floor(random)
}

// Returns arrays sorted by a key in ascending or descending order
function sortingHat(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const variableA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const variableB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (variableA > variableB) {
      comparison = 1;
    } else if (variableA < variableB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}


class App extends Component {
  state = {
    // baseURL:`https://api.magicthegathering.io/v1/cards?page=1&pageSize=50`,
    // randomPackUrlRNA:`https://api.magicthegathering.io/v1/sets/rna/booster`,
    // cardsURL:`/cards?page=`,
    cardsPageNumber:`1`,
    location:`rna`,
    randomCardImageUrl:`https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${getRandomNumber(1, 1000)}&type=card`,
    randomCardImage:'',
    getAllTheSets: `https://api.magicthegathering.io/v1/sets`,
    allTheSets: null,
    allCards:null,
    status:null
  }

  componentDidMount() {
    this.getCard(this.state.randomCardImageUrl);
    this.clearStatus()
  }

  getCard = URL => {
    this.setState({ randomCardImage:URL })
  }

  clearStatus = () => {
    setInterval(() => {
        this.setState({
          status:null
        })
    }, 5000);
  }



  // This method retrieves a random pack of cards
  getPackOfCards = setId => {
    this.setState({
      allCards:null,
      status:"Opening pack..."
    })
    // At a high level we are calling an API to fetch some mtg card data.
    // We then take that data and set it to our state.
    const URL = `https://api.magicthegathering.io/v1/sets/${setId}/booster`;
    fetch(URL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        allCards:null,
        status:`${data.cards.length} cards in pack`
      })
      this.checkPackOfCards(data.cards)
    })
    .catch(error => console.log("getRandomPack error", error))
  };
  
  checkPackOfCards = rawPackOfCards => {
    if(rawPackOfCards) {
      const cardsWithImage = rawPackOfCards.filter(card => card.imageUrl);
      this.setState({ 
        allCards:cardsWithImage
      });
    } else {
      this.setState({
        status:"No cards in pack! Try another set."
      })
    }
  }



  getAllTheSets = () => {
    fetch(this.state.getAllTheSets)
    .then(response => {
      return response.json()
    })
    .then(response => {
      this.setState({ 
        allTheSets: response.sets.sort(sortingHat('releaseDate', 'desc')) 
      })
    })
    .catch(error => console.log("getAllTheSets error", error))
  };


  statusCheck = status => {
    this.setState({
        status:status
    })
  }


  render() {
    return (
      <BrowserRouter>
        <NavBar />
        
        <Route 
          exact
          path='/'
          render={() => (
            <Home 
              randomCard={this.state.randomCard}
              randomCardImage={this.state.randomCardImage}
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
          path='/random-pack'
          render={() => (
            <RandomPack 
              allCards={this.state.allCards} 
              getPackOfCards={this.getPackOfCards}
              status={this.state.status}
              statusCheck={this.statusCheck}
            />
          )}
        />

        <Route 
          path='/card-search'
          render={() => (
            <CardSearch 
              statusCheck={this.statusCheck}
              status={this.state.status}
            />
          )}
        />

        <Route 
          path='/admin-tools'
          render={() => (
            <AdminTools 
              getAllTheSets={this.getAllTheSets}
              allTheSets={this.state.allTheSets}
            />
          )}
        />

        <Route 
          path='/collection'
          render={() => (
            <Collection 
              statusCheck={this.statusCheck}
              status={this.state.status}
            />
          )}
        />




      </BrowserRouter>
    );

  }
}

export default App

