import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer.js';
// import { cardsReducer } from './cardsReducer.js';
import { decksReducer } from './decksReducer.js';

export default combineReducers({
    usersReducer,
    // cardsReducer,
    decksReducer

});

