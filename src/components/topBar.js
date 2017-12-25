import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { toggleMenu } from '../actions';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */


class TopBar extends Component{
    constructor(props){
        super(props);
    }
    toggleButtonClicked(){
        console.log(this.props)
        this.props.toggleMenu();
    }

    render(){
        return(
            <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={this.toggleButtonClicked.bind(this)}
          />
        )
       
    }
  

}
  
export default connect(null, { toggleMenu })(TopBar);