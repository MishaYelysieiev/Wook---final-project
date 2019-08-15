import React from 'react';
import {Link} from "react-router-dom";

import './ProductCard.scss';

class ProductCard extends React.Component {

    constructor(props){
        super(props);
    }


    render() {
        return (
            <div className='ProductCard' id={this.props.id}>
                <div className="ProductCard_wrapper">
                    <img src={this.props.src} alt="book image"/>
                    <div className="ProductCard_buttons">
                        <p>{this.props.stoke ? 'On stoke': 'Not available'}</p>
                        <Link className='buy-btn book-btn' to={'/buy/'+this.props.id}>Buy now</Link>
                        <Link className='show-more-btn book-btn' to={'/book/'+this.props.id}>Read more</Link>
                    </div>
                </div>
                <div className="ProductCard_footer">
                    <p className="book-title">{this.props.title}</p>
                    <p className="book-author">{this.props.author}</p>
                    <p className="book-price">{'$' + this.props.price}</p>
                </div>



            </div>
        );
    }
}

export default ProductCard;