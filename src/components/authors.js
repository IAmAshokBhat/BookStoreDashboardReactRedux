import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper/Paper';
import { fetchAllAuthors } from '../actions'
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    padding:20
  };
  const loaderStyle = {
    container: {
      position: 'relative',
    },
    refresh: {
      display: 'inline-block',
      position: 'relative',
    },
  };
class Authors extends Component{
    componentDidMount(){
        this.props.fetchAllAuthors();
    }
    renderAuthors(){
        return _.map(this.props.authors, author =>{
            return (
                <MuiThemeProvider key={author.author_id}>
                    <Paper style={style} zDepth={2}>
                        <h4>{author.author_name}</h4>
                    </Paper>
                </MuiThemeProvider>
            )
        })      
    }

    render(){
        if(this.props.authors){           
            return(
                <div>
                    <h1>Authors</h1>
                    {this.renderAuthors()}
                </div>
            )
        }else{
           return(<div style={{
                position: "relative",  
                height: 100,
              }}>  <RefreshIndicator
                size={50}
                left={70}
                top={0}
                loadingColor="#FF9800"
                status="loading"
                style={style.refresh}
              /></div>)
        }
      
    }
}

function mapStateToProps(state){
    return { authors:state.authors }
}

export default connect (mapStateToProps,{ fetchAllAuthors })(Authors);
