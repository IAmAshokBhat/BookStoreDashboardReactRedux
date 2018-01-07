import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './materialCard';
import { fetchAllBooks } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
const style = {
 
  addIcon:{
      position: 'fixed',
      bottom:50,
      right:100,
      zIndex:999

    }
};
class MainLayout extends Component {
  constructor(props){
    super(props)
  }
      componentDidMount(){
        this.props.fetchAllBooks();
      }
      renderBooks(){
        return _.map(this.props.books, book =>{
          return(   
              
              <div className="col-md-3 " key={book.book_id}>
                <Card  data={book} className="padd-btm"/>
     
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
    books:state.books
  }
}

export default connect(mapStateToProps, {fetchAllBooks})(MainLayout)