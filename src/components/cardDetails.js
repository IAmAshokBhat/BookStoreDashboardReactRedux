import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { createBook, fetchAllPublications, fetchCategories, fetchAllAuthors  } from '../actions';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import _ from 'lodash';
import moment from 'moment';

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
class CardDetails extends Component{
    componentDidMount(){
        this.props.fetchAllPublications()
        this.props.fetchCategories()
        this.props.fetchAllAuthors();
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
        this.props.createBook(values,()=>{
            this.history.push("/");
        });
    } 
 

    render(){
        const { handleSubmit, publications, categories, authors } = this.props;

        if(Object.keys(authors).length == 0 || Object.keys(categories).length == 0 || Object.keys(publications).length == 0){
            return (
                    <div style={refreshIndicationStyle.container}>
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

        return(
            <div className="wrapper-form">
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
            </div>
        )
    }
}
function validate(values){
    const errors = {};
    console.log(values)
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

function mapStateToProps(state){
    return {
        publications:state.publications,
        categories:state.categories,
        authors:state.authors
    }
}


export default reduxForm({
    form:'BookNewForm',
    validate
})(connect(mapStateToProps,{ createBook, fetchAllPublications, fetchCategories, fetchAllAuthors  })(CardDetails));