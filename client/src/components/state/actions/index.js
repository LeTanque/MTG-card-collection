import axios from 'axios';
// import { axiosWithAuth } from "../../auth/axiosWithAuth.js";

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

// export const LOGIN_REFRESH_START = 'LOGIN_REFRESH_START';
// export const LOGIN_REFRESH_SUCCESS = 'LOGIN_REFRESH_SUCCESS';
// export const LOGIN_REFRESH_FAILURE = 'LOGIN_REFRESH_FAILURE';

// export const FETCH_CARDS_START = 'FETCH_CARDS_START';
// export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
// export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_DECKS_START = 'FETCH_DECKS_START';
export const FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS';
export const FETCH_DECKS_FAILURE = 'FETCH_DECKS_FAILURE';

export const ADD_DECK_START = 'ADD_DECK_START';
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS';
export const ADD_DECK_FAILURE = 'ADD_DECK_FAILURE';


export const userLogin = credentials => dispatch => {
    dispatch({ 
        type: LOGIN_START 
    });
    return axios
        .post('http://localhost:3333/v1/auth/login', credentials)
        .then(response => {
            localStorage.clear();
            localStorage.setItem('token', response.data.token);
            console.log("userLogin in actions: --> ", response);
            
            dispatch({ 
                type: LOGIN_SUCCESS, 
                payload: response.data.user
            });
        })
        .catch(error => {
            dispatch({ 
                type: LOGIN_FAILURE, 
                payload: error.message
            });
        })
}


export const getUsers = () => dispatch => {
    dispatch({
        type: FETCH_USERS_START
    })
    axios
        .get(
            'http://localhost:3333/v1/users', {
                headers: { 
                    Authorization: localStorage.getItem('token') 
                }
            }
        )
        .then(response => {
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: response.data,
            })
        })
        .catch(error => {
            dispatch({
                type: FETCH_USERS_FAILURE,
                payload: error.message,
            })
        })
}


export const getDecks = () => dispatch => {
    dispatch({
        type: FETCH_DECKS_START
    })
    axios
        .get(
            'http://localhost:3333/v1/decks', {
                headers: { 
                    Authorization: localStorage.getItem('token') 
                }
            }
        )
        .then(response => {
            dispatch({
                type: FETCH_DECKS_SUCCESS,
                payload: response.data,
            })
        })
        .catch(error => {
            dispatch({
                type: FETCH_DECKS_FAILURE,
                payload: error.message,
            })
        })
}

export const addDeck = deckObject => dispatch => {
    dispatch({
        type: ADD_DECK_START
    })
    axios({
        method: 'post',
        url: 'http://localhost:3333/v1/decks',
        data: deckObject,
        headers: { Authorization: localStorage.getItem('token') }
    })
        .then(response => {
            dispatch({
                type: ADD_DECK_SUCCESS,
                payload: response.data,
            })
        })
        .catch(error => {
            dispatch({
                type: ADD_DECK_FAILURE,
                payload: error.message,
            })
        })
}

export const getCards = () => dispatch => {
    // dispatch({
    //     type: FETCH_DECKS_START
    // })
    axios
        .get(
            'http://localhost:3333/v1/cards', {
                headers: { 
                    Authorization: localStorage.getItem('token') 
                }
            }
        )
        .then(response => {
            // dispatch({
            //     type: FETCH_DECKS_SUCCESS,
            //     payload: response.data,
            // })
        })
        .catch(error => {
            // dispatch({
            //     type: FETCH_DECKS_FAILURE,
            //     payload: error.message,
            // })
        })
}



export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_USER,
    })
}






// export const getCards = () => dispatch => {
//     dispatch({
//         type: FETCH_CARDS_START
//     })
//     axios
//         .get(
//             'http://localhost:3333/v1/cards', {
//                 headers: { 
//                     Authorization: localStorage.getItem('token') 
//                 }
//             }
//         )
//         .then(response => {
//             // console.log(response.data)
//             dispatch({
//                 type: FETCH_CARDS_SUCCESS,
//                 payload: response.data,
//             })
//         })
//         .catch(error => {
//             dispatch({
//                 type: FETCH_CARDS_FAILURE,
//                 payload: error.message,
//             })
//         })
// }

