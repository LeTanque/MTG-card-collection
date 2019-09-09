import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { Link } from "react-router-dom";

import { 
    getDecks,
    addDeck
} from '../../state/actions/index.js';


class AddDeck extends Component {
    state={
        name:"",
        description:"",
        imageUrl:""
    }

    handleChanges = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.addDeck(this.state);
    }

    render() {
        console.log("state in addDeck --> ", this.state)
        console.log("props in addDeck --> ", this.props)
        return (
            <>
                <h3>AddDeck</h3>
                <form onSubmit={this.handleSubmit} >
                    <input 
                        placeholder="Deck name"
                        name="name"
                        type="text"
                        onChange={this.handleChanges}
                        value={this.state.name}
                    />
                    <input 
                        placeholder="Description"
                        name="description"
                        type="text"
                        onChange={this.handleChanges}
                        value={this.state.description}
                    />
                    <input 
                        placeholder="Deck image URL"
                        name="imageUrl"
                        type="text"
                        onChange={this.handleChanges}
                        value={this.state.imageUrl}
                    />
                </form>
                <button onClick={this.handleSubmit}>Add Deck</button>
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
        getDecks,
        addDeck
    }
)(AddDeck)

