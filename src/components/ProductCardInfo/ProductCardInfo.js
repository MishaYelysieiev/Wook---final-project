import React from 'react';
import {Link} from "react-router-dom";

import './ProductCardInfo.scss';

const data1 = {
    _id: "5d5ba18db6fbe853e53929d0",
    title: 'A Smarter Way to Learn JavaScript: The new approach that uses technology to cut your effort in half',
    author: {
        _id: "5d5bd96f4835dc69dd5bcf9d",
        name: "Mark Myers"
    },
    price: 10.25,
    description: "Learn JavaScript with half the effort, aided by technology. Master each chapter with free interactive exercises online. Live simulation lets you see your practice code run in your browser. 2,000 lines of color-keyed sample code break it all down into easy-to-learn chunks. Extra help through the rough spots so you're less likely to get stuck.",
    image: {
        small: "https://ibb.co/album/jw0CWF",
        detailed: "https://i.ibb.co/xHwDYGg/Book-1-detailed.png"
    },
    category: {
        _id: "5d5582ab0de3f353d94ceaf6",
        name: "JavaScript"
    },
    details: {
        product_code: "1653754",
        pages: 256,
        size: "160x240mm",
        language: "English",
        public_date: "November 28, 2013"
    },
    _rating: 7.8,
    _stock: true,
    _date: "1567160339463",
    __v: 0
};


class ProductCardInfo extends React.Component {

    constructor(props){
        super(props);
        this.state={
            data:[],
            author:[],
            cathegory:[]
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/book/5d74d669f420a51b64d3a621').then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data);
            return this.setState({data:data,author:data.author});
        });
    }

    render() {

        const { data,author } = this.state;

        return (
            <div className='ProductCardInfo' id={data._id?data._id:data1._id}>
                <div className="ProductCardInfo_img">
                    <img src={data1.image.detailed} alt=""/>

                </div>
                <div className="ProductCardInfo_info">
                    <div className="header">
                        <h3 className="header_title">{data.title?data.title:data1.title}</h3>
                        <div className="header_author">by {author.name}</div>
                    </div>
                    <div className="subheader">
                        <div className="subheader_info">
                            <p className="subheader_price">${data.price?data.price:data1.price}</p>
                            <p className='subheader_stock'>{data.stoke?'In stock':'Not available'}</p>
                        </div>

                        <Link className='subheader_add-btn'>Add to Cart</Link>
                    </div>
                    <div className="description">
                        <p>{data.description?data.description:data1.description}</p>
                    </div>
                    <div className="details">
                        <p className='details_heading'>Product details</p>
                        <div className='details_info'>
                            <p>Product code:</p>
                            <div className="line"></div>
                            <p>{data1.details.product_code}</p>
                        </div>
                        <div className='details_info'>
                            <p>Pages:</p>
                            <div className="line"></div>

                            <p>{data1.details.pages}</p>
                        </div>
                        <div className='details_info'>
                            <p>Size:</p>
                            <div className="line"></div>
                            <p>{data1.details.size}</p>
                        </div>
                        <div className='details_info'>
                            <p>Language:</p>
                            <div className="line"></div>
                            <p>{data1.details.language}</p>
                        </div>
                        <div className='details_info'>
                            <p>Publication Date:</p>
                            <div className="line"></div>
                            <p>{data1.details.public_date}</p>
                        </div>

                    </div>

                </div>


            </div>
        );
    }
}

export default ProductCardInfo;