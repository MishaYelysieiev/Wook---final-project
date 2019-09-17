import React from 'react';
import {Link} from "react-router-dom";

import './ProductCard.scss';

class ProductCard extends React.Component {

    constructor(props){
        super(props);
    }

    addToCart(){
        let date = new Date();
        date.setDate(date.getDate()+1);
        let cart = document.querySelector('.cart_indicator');
        const { productCard } = this.props;

        if(document.cookie.split(';').filter(el=>el.split('_cart'))[0]){
            let cookie = document.cookie.split(';').filter(el=>el.split('_cart').length)[0].split('=')[1];
            let cookieArr = cookie.split(' ');
            document.cookie=`_cart=${cookie + " " + productCard._id};expires=${date}`;
            cart.innerText=`${cookieArr.length+1}`;
            cart.style.display='block';

        }else{
            document.cookie=`_cart=${productCard._id};expires=${date}`;
            cart.innerText='1';
            cart.style.display='block';

        }
    }


    render() {
        const { productCard } = this.props;
        return (
            <div className='ProductCard' id={productCard._id}>
                <div className="ProductCard_wrapper">
                    <img src={productCard.image.small} alt="book image"/>
                    <div className="ProductCard_buttons">
                        <button className='buy-btn book-btn' onClick={this.addToCart.bind(this)}>Buy now</button>
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
