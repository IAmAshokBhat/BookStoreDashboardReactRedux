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
import { style, refreshIndicationStyle } from '../commonStyles';
import Paper from 'material-ui/Paper/Paper';
import Dropzone from 'react-dropzone';
import async from 'async';

class BookDetails extends Component{

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
        if(id>=0){    
            async.parallel([
            (callback)=>{
                this.props.fetchAllPublications().then(()=>callback());
            },(callback)=>{
                this.props.fetchCategories().then(()=>callback());
            },(callback)=>{
                this.props.fetchAllAuthors().then(()=>callback());
            }],()=>{
                this.props.fetchBook(id);
            });
        }else{
                this.props.fetchAllPublications();
                 this.props.fetchCategories()
                 this.props.fetchAllAuthors();
            }
        if(this.props.uiChanges.open){            
            this.props.toggleMenu();
        }
    }
  
 
 closeSnackBar(){               
        this.setState({openSnackBar:false});
    }

    renderInputField({
        input,
        label,
        type,
        meta: { touched, error },
        ...custom
      }){
        const className = `form-group ${touched && error?'has-danger':''}`;
        return(
            <div className={className}>
                <MuiThemeProvider>
                <TextField
                  type={(type)?type:'string'}
                  floatingLabelText={label}
                  errorText={touched && error}
                  style={(style)?style:{}}
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

     renderDropzoneInput = (field) => {
        const files = field.input.value;
        return (
          <div>
            <Dropzone
              name={field.type}
              onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
            >
              <div>Drop thumbnail image here or click to browse</div>
            </Dropzone>
            {field.meta.touched &&
              field.meta.error &&
              <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
              <ul>
                { files.map((file, i) => <li key={i}>{file.name}</li>) }
              </ul>
            )}
          </div>
        );
      }
    
     onSubmit(values){
        if(values.book_id>=0){
            this.props.updateBook(values,(data)=>{
                console.log(data);
                this.props.history.push("/");
            });
        }else{
            var body = new FormData();
            Object.keys(values).forEach(( key ) => {               
                if(key=='thumb_url'){                 
                    body.append(key, values[ key ][0]);
                }else{
                    body.append(key, values[ key ]);
                }
            
            });
            console.info('POST', body);
            this.props.createBook(body,()=>{
                this.props.history.push("/");
            });
        }
        
    } 
 

    render(){
        const { handleSubmit, publications, categories, authors, books } = this.props;
        const { id } = this.props.match.params;
      
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
            // console.log(books[id].thumb_url)
            return(
                <MuiThemeProvider>
                <div className="wrapper-form">
                    <TopBar/>
                    <LeftDrawer/>
                    
                    <Paper className="col-md-6 col-md-offset-3" style={style.bookEntryStyle} zDepth={4}>
                   
                    <h1>Book Details</h1>
                    
                    <img src={(books[id])?books[id].thumb_url:''} width='50' className="pull-right" />
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                        
                        <Field 
                        label={"Book Name"}
                        name="book_name"
                        component={this.renderInputField}/>

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
                        label={"Description"}
                        name="description"
                        component={this.renderInputField}
                        multiLine={true}
                        rows={3}/>
    
                        <Field 
                        label={"Price"}
                        name="price"
                        component={this.renderInputField}
                        type="number"/>      
                        
                        <Field 
                        label={"Year Of Publication"}
                        name="yop"
                        component={this.renderDatePicker}/>
    
                    
    
                        {/* <Field 
                        label={"Thumbnail URL"}
                        name="thumb_urla"
                        type="file"
                        style={{height:86}}
                        component={this.renderInputField}
                        className="thumb-url"/> */}
                        <Field
                        type="files"
                        name="thumb_url"
                        component={this.renderDropzoneInput}
                        />
                        <button type="sumbit" className="btn btn-primary">Submit</button>
                        <Link className="btn btn-danger" to="/">Cancel</Link>
                    </form>  
                    </Paper>    
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
        enableReinitialize:true,
        uiChanges:state.uiChanges
    }
}

BookDetails =  reduxForm({
    form:'BookNewForm',
    validate
})(BookDetails);

// You have to connect() to any reducers that you wish to connect to yourself
BookDetails = connect(
    mapStateToProps,
    { createBook, fetchAllPublications, fetchCategories, fetchAllAuthors, fetchBook, updateBook  } // bind account loading action creator
  )(BookDetails);

 export default BookDetails
// export default reduxForm({
//     form:'BookNewForm',
//     validate
// })(connect(mapStateToProps,{ createBook, fetchAllPublications, fetchCategories, fetchAllAuthors, fetchBook  })(CardDetails));