import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { createBook, fetchAllPublications, fetchCategories, fetchAllAuthors, fetchBook, updateBook  } from '../actions';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import _ from 'lodash';
import moment from 'moment';
import TopBar from './topBar';
import LeftDrawer from './leftDrawer';
import Footer from './footer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';

const refreshIndicationStyle = {
    container: {
      position: 'relative',
      width: '100%',
      margin: '0 auto',
      textAlign: 'center'
    },
    refresh: {
      display: 'inline-block',
      position: 'relative',
    },
  };

  const style = {
      addIcon:{
        position: 'fixed',
        bottom:50,
        right:100

      }
  };
class CardDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            openSnackBar:false,
            message:'',
            autoHideDuration:4000
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
       
       // console.log(this.props.authors)
       this.props.fetchAllPublications()
       this.props.fetchCategories()
       this.props.fetchAllAuthors();
        if(id>=0){            
            this.props.fetchBook(id);
                      
            }
        if(this.props.uiChanges.open){            
            this.props.toggleMenu();
        }
    }

 closeSnackBar(){               
        this.setState({openSnackBar:false});
    }

    renderTextField({
        input,
        label,
        type,
        meta: { touched, error },
        ...custom
      }){
     ;
        const className = `form-group ${touched && error?'has-danger':''}`
        
        return(
            <div className={className}>
                {/* <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input}
                 />  */}
                <MuiThemeProvider>
                <TextField
                  type={(type)?type:'string'}
                  floatingLabelText={label}
                  errorText={touched && error}
                  {...input}
                  {...custom}
                />  
                </MuiThemeProvider>
            
                 
            </div>   
        )
    }

    renderSelectField({
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
      }){
        const className = `form-group ${touched && error?'has-danger':''}`
        return (
            <div className={className}>
                <MuiThemeProvider >
                    <SelectField
                        floatingLabelText={label}
                        errorText={touched && error}
                        {...input}
                        onChange={(event, index, value) => input.onChange(value)}
                        children={children}
                        {...custom}
                        maxHeight={200}
                        />
                </MuiThemeProvider>
             </div>
          )
      } 


    renderDatePicker({input,  label, meta: {touched, error} ,
         input: { value }, ...custom }){
        const className = `form-group ${touched && error?'has-danger':''}`
        const maxDate = new Date();
      
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setHours(0, 0, 0, 0);
        return (
            <div className={className}>
                <MuiThemeProvider >
                  
                <DatePicker  {...input} {...custom} autoOk={true} dateForm='MM/DD/YYYY' onChange={(event, value) => input.onChange(value)}
                   floatingLabelText={label}
                   errorText={touched && error}
                  openToYearSelection={true} 
                  value={ value && new Date(value) || null}/>
                  </MuiThemeProvider>
            </div>
          )
     }

    onSubmit(values){
        if(values.book_id>=0){
            this.props.updateBook(values,(data)=>{
                console.log(data);
                this.props.history.push("/");
            });
        }else{
            this.props.createBook(values,()=>{
                this.props.history.push("/");
            });
        }
        
    } 
 

    render(){
        const { handleSubmit, publications, categories, authors, books } = this.props;
        console.log(books)
        console.log()
        if(books.id){
            if(Object.keys(authors).length == 0 || Object.keys(categories).length == 0 || Object.keys(publications).length == 0 || Object.keys(books).length == 0){
                return (
                        <div style={refreshIndicationStyle.container} className='bd-top'>
                            <MuiThemeProvider >
                                <RefreshIndicator
                                    size={70}
                                    left={70}
                                    top={50}
                                    loadingColor="#FF9800"
                                    status="loading"
                                    style={refreshIndicationStyle.refresh}
                                    />
                            </MuiThemeProvider>
                        </div>)
            }  
        }else{
            return(
                <MuiThemeProvider>
                <div className="wrapper-form">
                    <TopBar history={this.props.history}/>
                    <LeftDrawer/>
                    <h1>Book Details</h1>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field 
                        label={"Book Name"}
                        name="book_name"
                        component={this.renderTextField}/>
    
                        <Field 
                        label={"Description"}
                        name="description"
                        component={this.renderTextField}
                        multiLine={true}
                        rows={3}/>
    
                        <Field 
                        label={"Price"}
                        name="price"
                        component={this.renderTextField}
                        type="number"/>      
                        
                        <Field 
                        label={"Year Of Publication"}
                        name="yop"
                        component={this.renderDatePicker}/>
    
                        <Field                 
                        label={"Author"} 
                        name="author_id"
                        component={this.renderSelectField}>
                        { _.map(this.props.authors,(author)=>{
                            return  <MenuItem key={author.author_id} value={author.author_id} primaryText={author.author_name} />
                        } )  }
                        </Field>
                        
                        <Field 
                        label={"Publication"}
                        name="publication_id"
                        component={this.renderSelectField}>
                        { _.map(this.props.publications,(publication)=>{
                            return  <MenuItem key={publication.publication_id} value={publication.publication_id} primaryText={publication.publication_name} />
                        } )  }
                        </Field>
    
                        <Field 
                        label={"Category"}
                        name="category_id"
                        component={this.renderSelectField}>
                        { _.map(this.props.categories,(category)=>{
                            return  <MenuItem key={category.category_id} value={category.category_id} primaryText={category.category_name} />
                        } )  }
                        </Field>
    
                        <Field 
                        label={"Thumbnail URL"}
                        name="thumb_url"
                        component={this.renderTextField}/>
    
                        <button type="sumbit" className="btn btn-primary">Submit</button>
                        <Link className="btn btn-danger" to="/">Cancel</Link>
                    </form>      
                    <Snackbar
                    open={this.state.openSnackBar}
                    message={this.state.message}                
                    autoHideDuration={this.state.autoHideDuration}               
                    onRequestClose={this.handleRequestClose}
                    onActionClick={this.closeSnackBar.bind(this)}
                    action="close"/>
                       <Footer />   
                </div>
                </MuiThemeProvider>
            )
        }
    

        
    }
}
function validate(values){
    const errors = {};
    if(!values.book_name){
        errors.book_name = "book_name cannot be empty";
    }
    if(!values.description){
        errors.description = "description cannot be empty";
    }
    if(!values.price){        
        errors.price = "price cannot be empty or non number";
    }
    if(values.price){   
             
        if(values.price<=0){        
            errors.price = "price cannot 0 or less";
        }

        if(values.price.toString().indexOf('e')>0){        
            errors.price = "price shuold be a number";
        }

    }

    if(!values.yop){
        errors.yop = "yop cannot be empty";
    }
    if(!values.author_id){
        errors.author_id = "author_id cannot be empty";
    }
    if(!values.publication_id){
        errors.publication_id = "publication_id cannot be empty";
    } 
    if(!values.category_id){
        errors.category_id = "category_id cannot be empty";
    }
    if(!values.thumb_url){
        errors.thumb_url = "thumb_url cannot be empty";
    }

    return errors;
}

function mapStateToProps(state,ownProps){
    return {
        publications:state.publications,
        categories:state.categories,
        authors:state.authors,
        books:state.books,
        initialValues: state.books[ownProps.match.params.id],
        uiChanges:state.uiChanges
    }
}

CardDetails =  reduxForm({
    form:'BookNewForm',
    validate
})(CardDetails);

// You have to connect() to any reducers that you wish to connect to yourself
CardDetails = connect(
    mapStateToProps,
    { createBook, fetchAllPublications, fetchCategories, fetchAllAuthors, fetchBook, updateBook  } // bind account loading action creator
  )(CardDetails);

 export default CardDetails
// export default reduxForm({
//     form:'BookNewForm',
//     validate
// })(connect(mapStateToProps,{ createBook, fetchAllPublications, fetchCategories, fetchAllAuthors, fetchBook  })(CardDetails));