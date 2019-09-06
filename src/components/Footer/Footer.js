import React from 'react';
import {Link} from "react-router-dom";


import Logo from '../Logo/Logo';
import envelope from './img/envelope.png';
import phone from './img/phone-call.png';
import PayPal from './img/Paypal.png';
import Visa from './img/Visa.png';
import Mastercard from './img/Mastercard.png';
import facebook from './img/facebook.png';



import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <div className = "Footer">
                <Logo className = "Footer_logo"/>
                 <div className = "Footer_wrapper">
                    <ul className = "Footer_menu">
                      <li className = "Footer_menu_list">Information</li>
                      <li className = "Footer_menu_item"><Link to='/'>Home</Link></li>
                      <li className = "Footer_menu_item"><Link to='/sale'>Sale</Link></li>
                      <li className = "Footer_menu_item">Returns and Refunds</li>
                      <li className = "Footer_menu_item">Terms and Conditions</li>
                    </ul>
                    <ul className = "Footer_menu">
                      <li className ="Footer_menu_list">Category</li>
                      <li className = "Footer_menu_item"> <Link to='/category/html/css'>HTML / CSS</Link> </li>
                      <li className = "Footer_menu_item"> <Link to='/category/javascript'>Java Script</Link> </li>
                      <li className = "Footer_menu_item"> <Link to='/category/pyton'>Pyton</Link> </li>
                      <li className = "Footer_menu_item"> <Link to='/category/php'>PHP</Link> </li>
                      <li className = "Footer_menu_item"> <Link to='/category/all'>All books</Link></li>
                    </ul>
                    <ul className = "Footer_menu">
                      <li><img src={envelope} alt="envelope"/><p className = "Footer_menu_item">bookshop@gmail.com</p></li>
                      <li className = "social"><img src={phone} alt="phone call"/><p className = "Footer_menu_item">+5 (036) 447 37 38</p></li>
                      <li className = "Footer_menu_social">
                       <img src={facebook} alt="facebook"/>
                      </li>
                    </ul>
                    <ul className = "Footer_menu">
                      <li className = "Footer_menu_list">How To Pay</li>
                      <li className = "Footer_menu_paypal"></li>                  
                      <li className = "Footer_menu_visa"></li>
                      <li className = "Footer_menu_mastercard"></li>
                    </ul>
                  </div>
             </div>
            );
    }
}
            

export default Footer;