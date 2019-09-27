import React from 'react';
import {Link} from "react-router-dom";

import Logo from '../Logo/Logo';
import envelope from './img/envelope.png';
import phone from './img/phone-call.png';

import cartIcon from '../Icons/Icon/cartIcon';
import searchIcon from '../Icons/Icon/searchIcon';
import accountIcon from '../Icons/Icon/accountIcon';

import './Header.scss';

document.addEventListener('click',function (e) {
    const menu = document.querySelector('#dropDownMenu');
    const search = document.querySelector('#search');
    const searchInput = document.querySelector('.search_input');
    const searchIcon = document.querySelector('.search_icon');
    if(menu.classList.contains('opened') && !e.target.classList.contains('nav_category') && !e.target.classList.contains('nav_burger')){
        menu.classList.remove('opened');
    } if(search.classList.contains('opened') && !e.target.classList.contains('search_input') && !e.target.classList.contains('search_icon') && e.target.id!=='search'){
        searchInput.value = '';
        search.classList.remove('opened');
        searchIcon.classList.remove('opened');
        searchInput.classList.remove('opened');
    }
});

document.addEventListener('keyup',function (e) {
    const search = document.querySelector('#search');
    const searchInput = document.querySelector('.search_input');
    const searchIcon = document.querySelector('.search_icon');

    if(e.key==='Enter' && searchInput.value){
        window.location.replace(`/book_search/${searchInput.value.split(' ').join('&')}`);
        searchInput.value = '';
        search.classList.remove('opened');
        searchIcon.classList.remove('opened');
        searchInput.classList.remove('opened');
    }
});



class Header extends React.Component {

    dropDownMenu(e) {
        const menu = document.querySelector('#dropDownMenu');
        menu.classList.toggle('opened');

    }

    checkOpenedDropDown() {
        const menu = document.querySelector('#dropDownMenu');
        menu.classList.remove('opened');

    }

    openSearchBar() {
        document.querySelector('#dropDownMenu').classList.remove('opened');
        const search = document.querySelector('#search');
        const searchInput = document.querySelector('.search_input');
        const searchIcon = document.querySelector('.search_icon');
        document.querySelector('.nav').classList.toggle('hidden');

        if (search.classList.contains('opened')) {
            if (searchInput.value) {
                window.location.replace(`/book_search/${searchInput.value.split(' ').join('&')}`);
                searchInput.value = '';
                search.classList.remove('opened');
                searchIcon.classList.remove('opened');
                searchInput.classList.remove('opened');
            } else {
                search.classList.remove('opened');
                searchIcon.classList.remove('opened');
                searchInput.classList.remove('opened');
            }

        } else {
            search.classList.add('opened');
            searchIcon.classList.add('opened');
            searchInput.classList.add('opened');
        }
    }

    checkCookieCart() {
        let cart = document.querySelector('.cart_indicator');
        if(document.cookie.includes('_cart')){
            let cookie = document.cookie.split(';').filter(el=>el.split('_cart').length)[0].split('=')[1];
            let cookieArr = cookie.split(' ');
            cart.innerText=`${cookieArr.length}`;
            cart.style.display='block';

        }
    }

    componentDidMount() {
        this.checkCookieCart();
    }

    render() {
        return (
            <div className='Header'>
                <div className="Header_wrapper">
                    <Logo click={this.checkOpenedDropDown.bind(this)}/>
                    <nav className="nav">
                        <Link onClick={this.checkOpenedDropDown} className='nav_link nav_home' to='/'>Home</Link>
                        <Link className='nav_link nav_category' to='#' onClick={this.dropDownMenu}>Category</Link>
                        <Link className='nav_link nav_burger' to='#' onClick={this.dropDownMenu}></Link>
                    </nav>
                    <div className="contact">
                        <div className="contact_item">
                            <img src={envelope} alt="envelope"/>
                            <a href='#'>bookshop@gmail.com</a>
                        </div>
                        <div className="contact_item">
                            <img src={phone} alt="phone call"/>
                            <a href='#'>+5 (036) 447 37 38</a>
                        </div>
                    </div>
                    <div className="tools">
                        <div className='tools_link search' id='search'>
                            <input type="text" placeholder='Search' className='search_input'/>
                            <span onClick={this.openSearchBar} className='search_icon'>{searchIcon()}</span>
                        </div>
                        <Link onClick={this.checkOpenedDropDown} className='tools_link cart_link' to='/cart'>
                            {cartIcon()}
                            <span className='cart_indicator'></span>
                        </Link>
                        <Link onClick={this.checkOpenedDropDown} className='tools_link' to='/cabinet/contact-information'>
                            {accountIcon()}
                        </Link>
                    </div>
                </div>
                <ul id='dropDownMenu' className='category'>
                    <li onClick={this.checkOpenedDropDown} className='category_item'><Link to='/category/all'>All
                        books</Link></li>
                    <li onClick={this.checkOpenedDropDown} className='category_item'><Link
                        to='/category/html/css'>HTML/CSS</Link></li>
                    <li onClick={this.checkOpenedDropDown} className='category_item'><Link
                        to='/category/javascript'>JavaScript</Link></li>
                    <li onClick={this.checkOpenedDropDown} className='category_item'><Link
                        to='/category/python'>Python</Link></li>
                    <li onClick={this.checkOpenedDropDown} className='category_item'><Link to='/category/php'>PHP</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;