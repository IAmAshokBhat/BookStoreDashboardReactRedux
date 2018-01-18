import { FETCH_ALL_AUTHORS, DELETE_AUTHOR, ADD_AUTHOR } from '../actions';
import _ from 'lodash';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_ALL_AUTHORS:        
            return _.mapKeys(action.payload.data.data,"author_id");
        case DELETE_AUTHOR:
            return _.omit(state.authors, action.payload);
        case ADD_AUTHOR:      
            return { "0":{author_id: 0, author_name: "a"}, ...state }
        default: return state;
    }
}

