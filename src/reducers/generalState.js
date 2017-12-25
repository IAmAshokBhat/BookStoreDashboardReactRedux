import { TOGGLE_MENU } from '../actions';
import _ from "lodash";

export default function(state =  {open: false} ,action){
    switch(action.type){
        case TOGGLE_MENU: 
         return {open: !state.open};   
      default:
        return state;
    }
}
