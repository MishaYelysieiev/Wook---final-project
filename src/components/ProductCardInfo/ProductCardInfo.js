import React from 'react';
// import {Link} from "react-router-dom";

import './ProductCardInfo.scss';



class ProductCardInfo extends React.Component {

    constructor(props){
        super(props);
        this.state={
            data:[],
            author:[],
            image:[],
            details:[]
        }
    }



    componentDidMount() {
        let url = window.location.href.split('/');
        let id = url[url.length-1];
        // fetch(`http://localhost:3001/book/${id}`).then((res)=>{
        fetch(`/book/${id}`).then((res)=>{
            console.log(id);
            return res.json()
        }).then((data)=>{
            console.log('this is data',data);
            return this.setState({
                data:data,
                author:data.author,
                image:data.image,
                details:data.details
            });
        });
    }

    render() {

        const { data,author,image,details } = this.state;

        function addToCart(){
            let date = new Date();
            date.setDate(date.getDate()+1);
            let cart = document.querySelector('.cart_indicator');

            if(document.cookie.split(';').filter(el=>el.split('_cart'))[0]){
                let cookie = document.cookie.split(';').filter(el=>el.split('_cart').length)[0].split('=')[1];
                let cookieArr = cookie.split(' ');
                document.cookie=`_cart=${cookie + " " + data._id};expires=${date}`;
                cart.innerText=`${cookieArr.length+1}`;
                cart.style.display='block';

            }else{
                document.cookie=`_cart=${data._id};expires=${date}`;
                cart.innerText='1';
                cart.style.display='block';

            }
        }

        return (
            <div className='ProductCardInfo' id={data._id}>
                <div className="ProductCardInfo_img">
                    <img src={image.detailed} alt=""/>

                </div>
                <div className="ProductCardInfo_info">
                    <div className="header">
                        <h3 className="header_title">{data.title}</h3>
                        <div className="header_author">by {author.name}</div>
                    </div>
                    <div className="subheader">
                        <div className="subheader_info">
                            <p className="subheader_price">${data.price}</p>
                            <p className='subheader_stock'>{data.stock}</p>
                        </div>

                        <button className='subheader_add-btn' onClick={addToCart}>Add to Cart</button>
                    </div>
                    <div className="description">
                        <p>{data.description}</p>
                    </div>
                    <div className="details">
                        <p className='details_heading'>Product details</p>
                        <div className='details_info'>
                            <p>Product code:</p>
                            <div className="line"></div>
                            <p>{details.product_code}</p>
                        </div>
                        <div className='details_info'>
                            <p>Pages:</p>
                            <div className="line"></div>

                            <p>{details.pages}</p>
                        </div>
                        <div className='details_info'>
                            <p>Size:</p>
                            <div className="line"></div>
                            <p>{details.size}</p>
                        </div>
                        <div className='details_info'>
                            <p>Language:</p>
                            <div className="line"></div>
                            <p>{details.language}</p>
                        </div>
                        <div className='details_info'>
                            <p>Publication Date:</p>
                            <div className="line"></div>
                            <p>{details.public_date}</p>
                        </div>

                    </div>

                </div>


            </div>
        );
    }


}

export default ProductCardInfo;