import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from './navigation'

import MainLayout from './mainLayout';

import TopBar from './topBar';
import LeftDrawer from './leftDrawer';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (

        <MuiThemeProvider>
          <div>
            <TopBar history={this.props.history}/>
            <LeftDrawer/>
            <MainLayout/>
           <Footer />   
          </div>
        </MuiThemeProvider>
             
      
       
    );
  }
}
