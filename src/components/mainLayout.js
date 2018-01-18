import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './book';
import { fetchAllBooks, toggleMenu  } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { style } from '../commonStyles';

class MainLayout extends Component {
  constructor(props){
    super(props)
  }
      componentDidMount(){
        this.props.fetchAllBooks();
        if(this.props.uiChanges.open){            
          this.props.toggleMenu();
      }
      }
      renderBooks(){
        return _.map(this.props.books, book =>{
          return(                 
              <div className="col-md-2 book-card" key={book.book_id}>
                <Book  data={book} className="padd-btm"/>
               </div>
          )
        })
      }
      
    render(){
   
        return(
          <MuiThemeProvider>
            <div className="card-wrapper ">
               <FloatingActionButton style={style.addIcon}>
                 <Link to="/book/-1" className="add-book"><ContentAdd/></Link>
                </FloatingActionButton>
                {this.renderBooks()}                              
         
            </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state){
  return{
    books:state.books, uiChanges:state.uiChanges
  }
}

export default connect(mapStateToProps, {fetchAllBooks, toggleMenu})(MainLayout)