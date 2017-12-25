import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper/Paper';
import _ from 'lodash';
import { connect } from 'react-redux';
import {fetchCategories} from '../actions';
const style = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    padding:20
  };
class Categories extends Component{
    componentDidMount(){
        this.props.fetchCategories();
    }

    renderCategories(){
        return _.map(this.props.categories, (category) =>{
            return (
                <MuiThemeProvider key={category.category_id}>
                    <Paper style={style} zDepth={2}>
                        <h4>{category.category_name}</h4>
                    </Paper>
                </MuiThemeProvider>
            )
        });
    }

    render(){
        return(
            <div>
            <h1>Categories</h1>
            {this.renderCategories()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        categories:state.categories
    }
}
export default connect(mapStateToProps,{fetchCategories})(Categories)