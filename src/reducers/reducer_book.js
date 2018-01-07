import { FETCH_ALL_BOOKS, FETCH_BOOK, UPDATE_BOOK } from '../actions';
import _ from "lodash";

export default function(state = {}  ,action){
    switch(action.type){
        case FETCH_ALL_BOOKS: 
         return _.mapKeys(action.payload.data.data,'book_id');   
    case FETCH_BOOK:
        return  { ...state, [action.payload.data.data[0].book_id]:action.payload.data.data[0]}   
      default:
        return state;
    }
}