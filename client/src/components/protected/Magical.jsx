import React, { Fragment, Component } from 'react';
import {Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import {  FaUnlock } from 'react-icons/fa';
import Loader from 'react-loader-spinner';

import { 
    userLogin, 
    getUsers, 
    logoutUser,
    getDecks
} from '../state/actions/index.js';

// import Profile from "./Users/Profile.jsx";



class Magical extends Component {
    
    
    componentDidMount() {
        this.props.getUsers();
        this.props.getDecks();
    }

    logout = () => {
        localStorage.clear();
        this.props.logoutUser();
    }
        
    render () {
        if (this.props.fetching) {
            return (
                <section className='profile-page-loading'>
                    <Loader type='Ball-Triangle' color='#0077cc' height='40%' weight='40%' />
                </section>

            )
        } else if (this.props.error) {
            return (
                <section className='profile-page-error'>
                    <Loader type='Ball-Triangle' color='#ff0000' height='40%' weight='40%' />
                    <code>{this.props.error}</code>
                </section>
            )
        }
        else if (this.props.logout) {
            return <Redirect to='/' />
        }

        return (
            <Fragment>
                
                <section className='profile-page'>

                    <div className='profile-header'>Profile &nbsp; :  &nbsp; Welcome {this.props.users.username}!
                        <button 
                            className='profile-logout btn-dark'
                            onClick={this.logout}
                        >Logout <FaUnlock /></button>
                    </div>

                    <hr></hr>
                    
                    {this.props.users.users ? this.props.users.users.map(user => (
                        <React.Fragment key={user.id}>
                            <p>{user.username}</p>
                        </React.Fragment>
                    )) : null}
                    
                    <hr></hr>

                    <div className='profile-header'>Decks &nbsp; : </div>
                    <br></br>

                    {this.props.decks ? this.props.decks.map(deck => (
                        <React.Fragment key={deck.id}>
                            <h3>{deck.name}</h3>
                            <p>{deck.description}</p>
                        </React.Fragment>
                    )) : null} 

                </section>
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    users: state.usersReducer.users,
    loggedInUser: state.usersReducer.loggedInUser,
    fetching: state.usersReducer.fetching,
    logout: state.usersReducer.logout,
    error: state.usersReducer.error,

    decks: state.decksReducer.decks
})

export default connect(
    mapStateToProps,
    { 
        userLogin,
        getUsers, 
        logoutUser, 
        getDecks
    }
)(Magical)
