import React, { Component } from 'react';
// import {Redirect} from "react-router-dom";
import { connect } from 'react-redux';
// import {  FaUnlock } from 'react-icons/fa';
// import Loader from 'react-loader-spinner';

// import { 
//     getUsers, 
//     // userLogin, 
//     // logoutUser 
// } from '../../state/actions/index.js';




class Profile extends Component {



    render () {
        console.log(this.props)
        return (
            <>
            </>
        )
    }
}


const mapStateToProps = state => ({
    users: state.usersReducer.users,
    loggedInUser: state.usersReducer.loggedInUser,
    fetching: state.usersReducer.fetching,
    logout: state.usersReducer.logout,
    error: state.usersReducer.error
})



export default connect(
    mapStateToProps,
    // { 
    //     getUsers, 
    //     // logoutUser, 
    //     // userLogin 
    // }
)(Profile)
        
// export default Profile;