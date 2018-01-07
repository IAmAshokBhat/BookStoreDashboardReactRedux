import { FETCH_ALL_PUBLICATIONS, DELETE_PUBLICATION, ADD_PUBLICATION } from '../actions';
import _ from "lodash";

export default function(state = {}  ,action){
    switch(action.type){
        case FETCH_ALL_PUBLICATIONS: 
            return _.mapKeys(action.payload.data.data,'publication_id');
        case DELETE_PUBLICATION:
            return _.omit(state.publications, action.payload)
        case ADD_PUBLICATION:
            return {"0":{"publication_id":"0","publication_name":"Type Publication Name"}, ...state}
      default:
        return state;
    }
}