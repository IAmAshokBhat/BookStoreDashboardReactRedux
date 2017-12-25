import { combineReducers } from 'redux';
import GeneralState from './generalState';
import Book from './reducer_book';
import Publications from './reducer_publication';
import Categories from './reducer_category';
import Authors from './reducer_author';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
 uiChanges: GeneralState,
 books: Book,
 publications: Publications,
 categories:Categories,
 authors: Authors,
 form: formReducer
 
});

export default rootReducer;
