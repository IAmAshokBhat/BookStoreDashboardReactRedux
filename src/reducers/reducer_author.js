import { FETCH_ALL_AUTHORS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_ALL_AUTHORS: 
            return _.mapKeys(action.payload.data.data,"author_id");
        default: return state;
    }
}