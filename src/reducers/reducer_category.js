
import { FETCH_ALL_CATEGORIES } from '../actions'
import _ from 'lodash';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_ALL_CATEGORIES:
            return _.mapKeys(action.payload.data.data,"category_id");
        default: return state;
    }
}