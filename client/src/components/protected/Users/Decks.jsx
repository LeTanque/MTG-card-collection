import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import Deck from "./Deck.jsx";


import { 
    getDecks
} from '../../state/actions/index.js';


class Decks extends React.Component {
    
    componentDidMount() {
        this.props.getDecks();
    }

    render() {
        return (
            <>
                <h3>These are the decks</h3>
                <Link to={"/magical/decks/add"}> <button>Add Deck</button> </Link>
                {this.props.decks ? this.props.decks.map(deck => (
                        <Deck deck={deck} key={deck.id} />
                    )) : 
                        null
                }
            </>
        );
    }
}


const mapStateToProps = state => ({
    fetching: state.decksReducer.fetching,
    decks: state.decksReducer.decks,
    error: state.decksReducer.error,
})

export default connect(
    mapStateToProps,
    { 
        getDecks
    }
)(Decks)


