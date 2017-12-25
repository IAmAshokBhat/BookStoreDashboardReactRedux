import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { toggleMenu } from '../actions';
import { Link } from 'react-router-dom';

class LeftDrawer extends Component {

  constructor(props) {
    super(props);
 
  }

toggleButtonClicked(){
  this.props.toggleMenu();
}
  render() {
    return (
      <div>
        <Drawer  
          docked={false}
          width={200}
          open={this.props.toggleFlag.open}
          onRequestChange={this.toggleButtonClicked.bind(this)}>     
          <MenuItem><Link to={'/'}>Books</Link></MenuItem>
          <MenuItem><Link to={'/publications'}>Publications</Link></MenuItem>
          <MenuItem><Link to={'/categories'}>Categories</Link></MenuItem>
          <MenuItem><Link to={'/authors'}>Authors</Link></MenuItem>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {toggleFlag:state.uiChanges}
}

export default connect(mapStateToProps,{ toggleMenu })(LeftDrawer)