import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper/Paper';
import { fetchAllAuthors, deleteAuthor, updateAuthor, addAuthor, toggleMenu } from '../actions'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import DeleteIcon from 'material-ui/svg-icons/navigation/close';
import SaveIcon from 'material-ui/svg-icons/content/save';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { red500, yellow500, blue500} from 'material-ui/styles/colors';
import InputComponent from './inputComponent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TopBar from './topBar';
import LeftDrawer from './leftDrawer';
import Footer from './footer';
import { style, loaderStyle } from '../commonStyles';

 
class Authors extends Component{
    constructor(props){
        super(props);
        this.state = {
            openSnackBar:false,
            message:'',
            autoHideDuration:4000
        }
    }
    componentDidMount(){
        this.props.fetchAllAuthors();
        if(this.props.uiChanges.open){            
            this.props.toggleMenu();
        }
    }

    deleteAuthor(id){        
        this.props.deleteAuthor(id,()=>{           
            this.setState({openSnackBar:true,message:'Deleted Successfully!'});
            this.props.fetchAllAuthors();
        });
    }
    updateAuthor(id, name){        
         this.props.updateAuthor({'author_id':id, 'author_name':name},()=>{           
            this.setState({openSnackBar:true,message:'Update Successfully!'});
            this.props.fetchAllAuthors();
        });
    }
    addAuthor(){
       this.props.addAuthor() 
    }
    closeSnackBar(){               
        this.setState({openSnackBar:false});
    }

    renderAuthors(){
        return _.map(this.props.authors, author =>{
            return (
                <MuiThemeProvider key={author.author_id}>
                    <Paper style={style.paperStyle} zDepth={4}>
                        <IconButton   iconStyle={style.closeIcon} style={style.closeIconStyle}
                        tooltip="Delete Author"
                        tooltipPosition="top-right"
                        onClick={this.deleteAuthor.bind(this,author.author_id)}>
                        <DeleteIcon/>
                        </IconButton>
                        <InputComponent   id={author.author_id} name={author.author_name} update={this.updateAuthor.bind(this)} />    
                    </Paper>
                </MuiThemeProvider>
                
            )
        })      
    }

    render(){
        if(this.props.authors){           
            return(
                    <MuiThemeProvider>
                        <div>
                            <TopBar history={this.props.history}/>
                            <LeftDrawer/>
                            <h1>Authors</h1>
                            {this.renderAuthors()}
                            <Snackbar
                            open={this.state.openSnackBar}
                            message={this.state.message}                
                            autoHideDuration={this.state.autoHideDuration}               
                            onRequestClose={this.handleRequestClose}
                            onActionClick={this.closeSnackBar.bind(this)}
                            action="close"/>
                            <FloatingActionButton style={style.addIcon}>
                                <ContentAdd onClick={this.addAuthor.bind(this)}/>
                            </FloatingActionButton>

                            <Footer />   
                        </div>
                    </MuiThemeProvider>             
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
    return { authors:state.authors, uiChanges:state.uiChanges }
}

export default connect (mapStateToProps,{ fetchAllAuthors, deleteAuthor, updateAuthor, addAuthor, toggleMenu })(Authors);
