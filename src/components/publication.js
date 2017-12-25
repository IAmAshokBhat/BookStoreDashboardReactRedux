import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { fetchAllPublications } from '../actions';
import _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
const style = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  padding:20
};

class Publications extends Component{
    componentDidMount(){
        this.props.fetchAllPublications();
    }
    renderPublications(){
        return _.map(this.props.publications,(publication)=>{
            return (
                <MuiThemeProvider  key={publication.publication_id}>
                <Paper style={style} zDepth={2}>
                    <h4>{publication.publication_name}</h4>
                    
                </Paper>
                </MuiThemeProvider>
                
            )
        })
    }
    render(){
       
        return(
            <div>
                <h1>Publications</h1>
                {this.renderPublications()}
          </div>
        )
    }

}
function mapStateToProps(state){
    return { publications:state.publications }
}

export default connect(mapStateToProps,{ fetchAllPublications })(Publications);