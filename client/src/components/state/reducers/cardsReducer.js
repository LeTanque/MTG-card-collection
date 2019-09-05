import {
    FETCH_CARDS_START,
    FETCH_CARDS_SUCCESS,
    FETCH_CARDS_FAILURE
} from '../actions';



const initialState = {
   cards:[],
   fetching: false,
   error: null
}



export const cardsReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_CARDS_START:
            return {
                ...state,
                fetching: true
            }
        case FETCH_CARDS_SUCCESS:
            return {
                ...state,
                fetching: false,
                cards: action.payload,
                error: null,
            }
        case FETCH_CARDS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }


        default:
            return state;
            
    }
}

