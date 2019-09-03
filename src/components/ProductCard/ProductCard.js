import React from 'react';
import {Link} from "react-router-dom";

import './ProductCard.scss';

class ProductCard extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const { productCard } = this.props;
        const { style } = this.props;
        return (
            <div className='ProductCard' id={productCard.id} style={style}>
                <div className="ProductCard_wrapper">
                    <img src={productCard.src} alt="book image"/>
                    <div className="ProductCard_buttons">
                        <p>{productCard.stoke ? 'On stoke': 'Not available'}</p>
                        <Link className='buy-btn book-btn' to={'/buy/'+productCard.id}>Buy now</Link>
                        <Link className='show-more-btn book-btn' to={'/book/'+productCard.id}>Read more</Link>
                    </div>
                </div>
                <div className="ProductCard_footer">
                    <p className="book-title">{productCard.title}</p>
                    <p className="book-author">{productCard.author}</p>
                    <p className="book-price">{'$' + productCard.price}</p>
                </div>

            </div>
        );
    }
}

export default ProductCard;