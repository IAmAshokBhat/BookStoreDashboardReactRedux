import React, { Component } from 'react';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import IconButton from 'material-ui/IconButton';
import ShareIcon from 'material-ui-icons/Share';
import InfoIcon from 'material-ui-icons/Info';
import { Link } from 'react-router-dom';
import { style } from '../commonStyles';


class Book extends Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false,
            toggle:false
          }
    }
    updateCheck() {
        this.setState((oldState) => {
          return {
            checked: !oldState.checked,
          };
        });
      }
      toggle(){
          this.setState({toggle:!this.state.toggle})
      }

    render(){
        const {author_name, thumb_url, price, category_name, book_id, book_name, description } = this.props.data;
        return(
            <Card >
                <CardHeader
                title= {book_name}
                subtitle={author_name}   
                titleStyle={{'fontSize': '15px'}} 
                containerStyle={{'paddingRight':'0px'}}  
                className="pdr-0 ht-92"     
                />
                <CardMedia  className="ht-407">
                <Link to={`/book/${book_id}`}><img src={thumb_url} alt="" className="img-responsive" /></Link>
                </CardMedia>
                <CardTitle title={book_name} titleStyle={{'fontSize': '15px'}} style={{'padding':'10px 15px 0'}}/>
                    <div className="pos-rel">    
                     <div className="disp-inline price">
                      {`Rs.${price}`}
                    </div>
                    <div className="disp-inline fav-icon">
                    <IconButton><Checkbox
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            style={style.checkbox}/>
                            </IconButton>
                    </div>
                    {/* <div className="disp-inline">
                        <IconButton aria-label="Share">
                        <ShareIcon />
                        </IconButton>
                    </div> */}
              
                    <div className="disp-inline info">
                        <IconButton aria-label="expand" onClick={this.toggle.bind(this)}>
                        <InfoIcon />
                        </IconButton>
                    </div>
                   </div> 
                <CardText className={(this.state.toggle?'show':'hide')}>
                  {description}
                </CardText>
               
            </Card>
        )
        
    }

}

export default Book;