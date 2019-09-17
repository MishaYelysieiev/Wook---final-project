import React from 'react';
import {Link} from "react-router-dom";

import './Cart.scss';


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

    }

    removeDuplicates(originalArray) {
        let newArray = [];
        originalArray.forEach((item)=>{
            if(newArray.length){
                let res = newArray.find((el)=>{
                    return el.props.id==item.props.id
                });
                console.log(res);
                if(!res){
                    newArray.push(item);
                }
            }else{
                newArray.push(item);
            }

        });

        return newArray;
    }

    arr = document.cookie.split(';').filter(el => el.split('_cart').length)[0].split('=')[1].split(' ');


    async componentDidMount() {
        let data = [];
        const that = this;
        await this.arr.forEach(async function (el) {

            let book = await fetch(`http://localhost:3001/book/${el}`).then((res) => {
                return res.json()
            }).then((data) => {
                return data
            }).catch(err => err);

            await data.push(book);

            that.setState({data: data})


        });

    }


    render() {

        const {data} = this.state;

        const arr = data.map((el) => el);




        let component = null;

        if (arr.length === this.arr.length) {


            const info = arr.map((el) => {
                return (
                    <div className="item" id={el._id}>
                        <img src={el.image.small} alt=""/>
                        <div className="item_details">
                            <p className='item_title'>{el.title}</p>
                            <p className='item_author'>{el.author.name}</p>
                        </div>
                        <input className='item_counter' type="number" step='1' min='1' placeholder={
                            arr.reduce((acc,item)=>{
                                if(item._id==el._id){
                                    acc++
                                }
                                return acc;
                                },0)
                        }/>
                        <p className='item_price'>${(el.price * (arr.reduce((acc,item)=>{
                            if(item._id==el._id){
                                acc++
                            }
                            return acc;
                        },0))).toFixed(2)}</p>
                        <button className='item_delete'>&#10539;
                        </button>
                    </div>
                )
            });
            component =
                <div className='Cart'>

                    <div className="Cart_container">
                        <h2 className="Cart_header">Cart</h2>
                        <div className='Cart_main'>
                            {this.removeDuplicates(info)}
                        </div>
                        <div className="Cart_footer">
                            <Link className='Cart_link' to='/category/all'><span>&#60;</span>Back to Selection</Link>
                            <p className='Cart_total'>Total cost <span>${(arr.reduce((ac,el)=>{return ac+el.price},0)).toFixed(2)}</span></p>
                        </div>
                    </div>

                    <div className="Delivery">
                        <form action="">
                            <h3>Delivery & Payment</h3>
                            <div className="info-main">
                                <label><p>First Name <span>*</span></p><input type="text" name='firstname' placeholder='First Name'/></label>
                                <label><p>Last Name <span>*</span></p><input type="text" name='lastname' placeholder='Last Name'/></label>
                                <label><p>Phone <span>*</span></p><input type="text" name='phone' placeholder='+380 00 000 00 00'/></label>
                                <label><p>Email <span>*</span></p><input type="text" name='email' placeholder='example@mail.com'/></label>
                            </div>
                            <h3>Delivery</h3>
                            <div className="info-delivery">
                                <div className="radio-wrapper">
                                    <label><input type="radio" name='deliveryMethod'/>Mail Delivery</label>
                                    <label><input type="radio" name='deliveryMethod'/>Address Delivery</label>
                                    <label><input type="radio" name='deliveryMethod'/>Pickup</label>
                                </div>
                                <div className="info-address">
                                    <label className='country'>Country <input type="text" placeholder='Enter your country'/></label>
                                    <label className='city'>City <input type="text" placeholder='Enter your city'/></label>
                                    <label className='address'>Address <input type="text" placeholder='Enter your address'/></label>
                                </div>
                            </div>
                            <h3>Payment</h3>

                            <select name="payment" id="payment-method" className='info-payment-method'>
                                <option value="card">Credit card</option>
                                <option value="cash">Cash to the courier</option>
                            </select>


                            <input type="submit" value='Checkout' className='checkout-btn'/>
                        </form>

                    </div>
                </div>
        }

        return (
            <div className='Cart_wrapper'>
                {component}
            </div>

        )
    }
}

export default Cart;