import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SaveIcon from 'material-ui/svg-icons/content/save';

const style = {  
   saveIcon: {
        width: 20,
        height: 20,
      },
      saveIconStyle: {
        width: 32,
        height: 32, 
        verticalAlign: 'middle'
      }
};

export default class InputField extends Component{
    
    constructor(props){
        const { name, id }  = props
        super(props);
        this.state = {
            inputValue: name,
            errorText:''
        }
    }

    handleValueChange(e){
        // if(e.target.value.length == 0){
        //     this.setState({errorText:'Value cannot be null'}); 
        // }else{
            this.setState({inputValue:e.target.value});        
        // }
        
    }

    saveNewValue(){
        const { id }  = this.props;
        this.props.update(id,this.state.inputValue);
    }

    render(){
        const { name, id }  = this.props
        if(!name){
            return (<div>...</div>)
        }
        return(
            <div>
                <MuiThemeProvider>
                    <TextField 
                    defaultValue={this.state.inputValue} 
                    id={name} 
                    value={this.state.inputValue} 
                    onChange={this.handleValueChange.bind(this)}
                    errorText={this.state.errorText}/>  
                </MuiThemeProvider>                      
                <SaveIcon  
                hoverColor={blue500} 
                style={style.saveIconStyle}
                onClick={this.saveNewValue.bind(this)}/>    
            </div>    
        )

    }

}