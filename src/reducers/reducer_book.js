import { FETCH_ALL_BOOKS } from '../actions';
import _ from "lodash";

export default function(state = {}  ,action){
    switch(action.type){
        case FETCH_ALL_BOOKS: 
         return _.mapKeys(action.payload.data.data,'book_id');   
      default:
        return state;
    }
}