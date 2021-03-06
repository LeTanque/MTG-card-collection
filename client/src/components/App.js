import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import mtg from 'mtgsdk';

import Home from './Navigation/Home.jsx';
import NavBar from './Navigation/NavBar.jsx';
import CardSearch from './Cards/CardSearch.jsx';
import RandomCard from './RandomCards/RandomCard.jsx';
import RandomPack from './RandomCards/RandomPack.jsx';
import AdminTools from './Admin/AdminTools.jsx';
import Collection from './Collection/Collection.jsx';


import PrivateRoute from './auth/PrivateRoute.jsx';
import Login from './auth/Login.jsx';
import Magical from './protected/Magical.jsx';
import Decks from './protected/Users/Decks.jsx';
import AddDeck from "./protected/Users/AddDeck.jsx";
// import Authentication from './auth/Authentication.jsx';


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
    location: `rna`,
    randomCardImageUrl: `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${getRandomNumber(1, 1000)}&type=card`,
    randomCardImage: '',
    getAllTheSets: `https://api.magicthegathering.io/v1/sets`,
    allTheSets: null,
    packOfCards: null,
    allTheTypes: '',
    status: null,

    cardSearchResults: [],
    cardsWithPictures: [],
    searchResultPlaceholder: 'Search for cards',
    currentSearch: {
      name: '',
    }

  }

  componentDidMount() {
    this.getCard(this.state.randomCardImageUrl);
    this.clearStatus();
    this.getAllTheTypes();
  }

  getCard = URL => {
    this.setState({ randomCardImage:URL });
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
      packOfCards:null,
      status:"Opening pack...",
      searchResultPlaceholder:'Searching...'
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
        packOfCards:null,
        status:`${data.cards.length} cards in pack`,
        searchResultPlaceholder: ''
      })
      this.checkPackOfCards(data.cards)
    })
    .catch(error => console.log("getRandomPack error", error))
  };
  
  checkPackOfCards = rawPackOfCards => {
    if(rawPackOfCards) {
      const cardsWithImage = rawPackOfCards.filter(card => card.imageUrl);
      this.setState({ 
        packOfCards:cardsWithImage
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


  getAllTheTypes = () => {
    if (this.state.allTheTypes.length === 0) {
      try {
        mtg.type.all()
        .on('data', results => {
          this.setState({
            allTheTypes:[
              ...this.state.allTheTypes,
              results
            ]
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    return;
  }

  statusCheck = status => {
    this.setState({
        status:status
    })
  }



  findCard = ({ name, type, subtypes, set, colors, page }) => {
      if(!name && !type && !subtypes && !set && !colors) {
          return this.setState({
              searchResultPlaceholder:'Please try again!',
          });
      }

      mtg.card
      .where({
          name: name,
          type: type,
          subtypes: subtypes,
          set: set,
          colors: colors,
          page: page,
      })
      .then(results => {
          if(results.length === 0) {
              this.setState({
                  searchResultPlaceholder:'No results!'
              })
          }
          if(results === null) {
              this.setState({
                  searchResultPlaceholder:'Searching...'
              })
          }
          else {
              this.setState({
                  cardSearchResults: results,
                  currentSearch: {
                    ...this.state.currentSearch,
                    name
                  }
              })
              this.removeCardsWithNoPics();
          }
      })
      .catch(error => {
          this.setState({
              searchResultPlaceholder:'Error fetching results!'
          })
          console.log(error);
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
          searchResultPlaceholder: 'Searching...'
      })
      this.findCard(searchParams);
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
              packOfCards={this.state.packOfCards} 
              getPackOfCards={this.getPackOfCards}
              status={this.state.status}
              statusCheck={this.statusCheck}
              searchResultPlaceholder={this.state.searchResultPlaceholder}
            />
          )}
        />

        <Route 
          path='/card-search'
          render={() => (
            <CardSearch 
              statusCheck={this.statusCheck}
              status={this.state.status}
              sortingHat={sortingHat}
              submitSearch={this.submitSearch}
              cardsWithPictures={this.state.cardsWithPictures}
              searchResultPlaceholder={this.state.searchResultPlaceholder}
              currentSearch={this.state.currentSearch}
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

        <Route 
          exact
          path='/auth/login' 
          component={Login} 
        />

        <PrivateRoute 
          exact 
          path='/magical' 
          component={Magical}
        />

        <Route 
          exact 
          path='/magical/decks' 
          render={(props) => (
            <Decks {...props} />
          )}
        />

        <Route 
          exact 
          path='/magical/decks/add' 
          render={props => (
            <AddDeck  {...props} />
          )}
        />

        {/* <PrivateRoute 
          exact 
          path='/decks' 
          component={Decks}
        /> */}


      </BrowserRouter>
    );

  }
}

export default App

