import { FETCH_ALL_PUBLICATIONS } from '../actions';
import _ from "lodash";

export default function(state = {}  ,action){
    switch(action.type){
        case FETCH_ALL_PUBLICATIONS: 
         return _.mapKeys(action.payload.data.data,'publication_id');   
      default:
        return state;
    }
}