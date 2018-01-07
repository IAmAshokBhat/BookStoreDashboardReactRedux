
import { FETCH_ALL_CATEGORIES, DELETE_CATEGORY, ADD_CATEGORY } from '../actions'
import _ from 'lodash';

export default function(state = {}, action){
    switch(action.type){
        case FETCH_ALL_CATEGORIES:
            return _.mapKeys(action.payload.data.data,"category_id");
        case DELETE_CATEGORY:
            return _.omit(state.categories, action.payload)
        case ADD_CATEGORY:
            return {"0":{"category_id":"0","category_name":"Type Category Name"}, ...state}
        default: return state;
    }
}