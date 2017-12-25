import React, { Component } from 'react';

import Card from './materialCard';
import { fetchAllBooks } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class MainLayout extends Component {
      componentDidMount(){
        this.props.fetchAllBooks();
      }
      renderBooks(){
        return _.map(this.props.books, book =>{
          return(
            <div className="col-md-2" key={book.book_id}>
              <Card  data={book}/>
          </div>
          )
        })
      }
    render(){
   
        return(
            <div>
                
                {this.renderBooks()}                              
         
            </div>
        );
    }
}

function mapStateToProps(state){
  return{
    books:state.books
  }
}

export default connect(mapStateToProps, {fetchAllBooks})(MainLayout)