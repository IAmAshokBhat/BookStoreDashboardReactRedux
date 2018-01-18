import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { fetchAllPublications, deletePublication, updatePublication, addPublication, toggleMenu } from '../actions';
import _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import DeleteIcon from 'material-ui/svg-icons/navigation/close';
import Snackbar from 'material-ui/Snackbar';
import InputComponent from '../components/inputComponent';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TopBar from './topBar';
import LeftDrawer from './leftDrawer';
import Footer from './footer';
import { style } from '../commonStyles';


class Publications extends Component{
    constructor(props){
        super(props);
        this.state = {
            openSnackBar:false,
            message:'',
            autoHideDuration:4000
        }
    }

    componentDidMount(){
        this.props.fetchAllPublications();
        if(this.props.uiChanges.open){            
            this.props.toggleMenu();
        }
    }

    deletePublication(id){        
        this.props.deletePublication(id,()=>{           
            this.setState({openSnackBar:true,message:'Deleted Successfully!'});
            this.props.fetchAllPublications();
        });
    }
    updatePublication(id, name){        
        this.props.updatePublication({'publication_id':id,'publication_name':name},()=>{           
            this.setState({openSnackBar:true,message:'Update Successfully!'});
            this.props.fetchAllPublications();
        });
    }
    addPublication(id, name){        
        this.props.addPublication();       
    }
    closeSnackBar(){               
        this.setState({openSnackBar:false});
    }


    renderPublications(){
        return _.map(this.props.publications,(publication)=>{
            return (
                <MuiThemeProvider  key={publication.publication_id}>
                <Paper style={style.paperStyle} zDepth={4}>
                <IconButton   iconStyle={style.closeIcon} style={style.closeIconStyle}
                     tooltip="Delete Publication"
                     tooltipPosition="top-right"
                     onClick={this.deletePublication.bind(this,publication.publication_id)}
                >
                <DeleteIcon/>
                </IconButton>
                    <h4>{}</h4>
                    
                    <InputComponent   id={publication.publication_id} name={publication.publication_name} update={this.updatePublication.bind(this)} />    
                </Paper>
               
                </MuiThemeProvider>
                
            )
        })
    }
    render(){
       
        return(
            <MuiThemeProvider>
                <div>
                    <TopBar/>
                    <LeftDrawer/>
                    <h1>Publications</h1>
                    {this.renderPublications()}
                    <Snackbar
                    open={this.state.openSnackBar}
                    message={this.state.message}                
                    autoHideDuration={this.state.autoHideDuration}               
                    onRequestClose={this.handleRequestClose}
                    onActionClick={this.closeSnackBar.bind(this)}
                    action="close"/>
                    <FloatingActionButton style={style.addIcon}>
                        <ContentAdd onClick={this.addPublication.bind(this)}/>
                    </FloatingActionButton>
                    <Footer />   
                </div>
            </MuiThemeProvider> )
    }

}
function mapStateToProps(state){
    return { publications:state.publications, uiChanges:state.uiChanges }
}

export default connect(mapStateToProps,{ fetchAllPublications, deletePublication, updatePublication, addPublication, toggleMenu })(Publications);