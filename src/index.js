import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CardDetails from './components/cardDetails'
import App from './components/app';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
import Publications from './components/publication'
import Categories from './components/categories';
import Authors from './components/authors';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>      
          <Route path="/book/:id" component={CardDetails}/>
          <Route path="/publications" component={Publications}/>
          <Route path="/categories" component={Categories}/>
          <Route path="/authors" component={Authors}/>
          <Route path="/" component={App}/>
       
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.root'));
