import React from 'react';
import {Link} from "react-router-dom";

import './ProductCard.scss';

class ProductCard extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const { productCard } = this.props;
        return (
            <div className='ProductCard' id={productCard._id}>
                <div className="ProductCard_wrapper">
                    <img src={productCard.src} alt="book image"/>
                    <div className="ProductCard_buttons">
                        <p>{productCard.stock ? 'On stock': 'Not available'}</p>
                        <Link className='buy-btn book-btn' to={'/buy/'+ productCard._id}>Buy now</Link>
                        <Link className='show-more-btn book-btn' to={'/book/'+ productCard._id}>Read more</Link>
                    </div>
                </div>
                <div className="ProductCard_footer">
                    <p className="book-title">{productCard.title}</p>
                    <p className="book-author">{productCard.author.name}</p>
                    <p className="book-price">{'$' + productCard.price}</p>
                </div>

            </div>
        );
    }
}

export default ProductCard;
