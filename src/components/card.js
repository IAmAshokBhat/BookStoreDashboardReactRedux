import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Card extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const {author, topImage, price, category, id, name } = this.props.book;
        return(
            <Link to={`/${category}/${id}` }  className={`card ${this.props.cardSize}`}>
                <div>
                    <div className="top-image" style={{backgroundImage:`url(${topImage})`}}></div>
                    <div className="details">
                        <h3 className="name">{ name }</h3>
                        <h6 className="author">{author}</h6>
                        <h5 className="price">{price}</h5>
                        <span  className="fav-icon glyphicon glyphicon-heart"></span> 
                    </div>
                
                </div>
            </Link>
        )

    }
}
