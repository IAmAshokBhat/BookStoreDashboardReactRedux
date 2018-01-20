import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper/Paper';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategories, deleteCategory, updateCategory, addCategory, toggleMenu} from '../actions';
import DeleteIcon from 'material-ui/svg-icons/navigation/close';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import InputComponent from '../components/inputComponent';
import TopBar from './topBar';
import LeftDrawer from './leftDrawer';
import Footer from './footer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { style } from '../commonStyles';

class Categories extends Component{
    constructor(props){
        super(props);
        this.state = {
            openSnackBar:false,
            message:'',
            autoHideDuration:4000
        }
    }
    componentDidMount(){
        this.props.fetchCategories();
        if(this.props.uiChanges.open){            
            this.props.toggleMenu();
        }
    }
    
    deleteCategory(id){
        
        this.props.deleteCategory(id,()=>{           
            this.setState({openSnackBar:true,message:'Deleted Successfully!'});
            this.props.fetchCategories();
        });
    }
    closeSnackBar(){               
        this.setState({openSnackBar:false});
    }
    updateCategory(id, name){
        this.props.updateCategory({'category_id': id, 'category_name': name},()=>{
            this.setState({openSnackBar:true,message:'Updated Successfully!'});
            this.props.fetchCategories();
        });
    }
    addCategory(){
        this.props.addCategory();
    }

    renderCategories(){
        return _.map(this.props.categories, (category) =>{
            return (
                <MuiThemeProvider key={category.category_id}>
                    <Paper style={style.paperStyle} zDepth={4}>
                    <IconButton   iconStyle={style.closeIcon} style={style.closeIconStyle}
                     tooltip="Delete Category"
                     tooltipPosition="top-right"
                     onClick={this.deleteCategory.bind(this,category.category_id)}
                    >
                        <DeleteIcon/>
                    </IconButton>                      
                        <InputComponent   id={category.category_id} name={category.category_name} update={this.updateCategory.bind(this)} />    
                    </Paper>
                </MuiThemeProvider>
            )
        });
    }

    render(){
        return(

            <MuiThemeProvider>
            <div>
                <TopBar history={this.props.history}/>
                <LeftDrawer/>
                <h1>Categories</h1>
                {this.renderCategories()}
                <Snackbar
                open={this.state.openSnackBar}
                message={this.state.message}                
                autoHideDuration={this.state.autoHideDuration}               
                onRequestClose={this.handleRequestClose}
                onActionClick={this.closeSnackBar.bind(this)}
                action="close"/>
                <FloatingActionButton style={style.addIcon}>
                    <ContentAdd onClick={this.addCategory.bind(this)}/>
                </FloatingActionButton>
                <Footer />   
            </div>
        </MuiThemeProvider>)
    }
}

function mapStateToProps(state){
    return {
        categories:state.categories,
        uiChanges: state.uiChanges
    }
}
export default connect(mapStateToProps,{fetchCategories, deleteCategory, updateCategory, addCategory, toggleMenu})(Categories)