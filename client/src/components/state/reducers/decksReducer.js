import {
    FETCH_DECKS_START,
    FETCH_DECKS_SUCCESS,
    FETCH_DECKS_FAILURE
} from '../actions';



const initialState = {
   decks:[],
   fetching: false,
   error: null
}



export const decksReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_DECKS_START:
            return {
                ...state,
                fetching: true
            }
        case FETCH_DECKS_SUCCESS:
            return {
                ...state,
                fetching: false,
                decks: action.payload,
                error: null,
            }
        case FETCH_DECKS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }


        default:
            return state;
            
    }
}

