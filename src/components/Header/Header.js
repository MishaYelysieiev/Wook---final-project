import React from 'react';
import {Link} from "react-router-dom";

import Logo from '../Logo/Logo';
import envelope from './img/envelope.png';
import phone from './img/phone-call.png';

import cartIcon from '../Icons/Icon/cartIcon';
import searchIcon from '../Icons/Icon/searchIcon';
import accountIcon from '../Icons/Icon/accountIcon';

import './Header.scss';



class Header extends React.Component {

    dropDownMenu() {
        const menu = document.querySelector('#dropDownMenu');
        menu.classList.toggle('opened');
    }

    checkOpenedDropDowm() {
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
                window.location.replace(`/search/${searchInput.value.split(' ').join('&')}`)
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

    render() {
        return (
            <div className='Header'>
                <div className="Header_wrapper">
                    <Logo click={this.checkOpenedDropDowm.bind(this)}/>
                    <nav className="nav">
                        <Link onClick={this.checkOpenedDropDowm} className='nav_link' to='/'>Home</Link>
                        <Link className='nav_link' to='#' onClick={this.dropDownMenu}>Category</Link>
                        <Link onClick={this.checkOpenedDropDowm} className='nav_link' to='/sale'>Sale</Link>
                    </nav>
                    <div className="contact">
                        <div className="contact_item">
                            <img src={envelope} alt="envelope"/>
                            <p>bookshop@gmail.com</p>
                        </div>
                        <div className="contact_item">
                            <img src={phone} alt="phone call"/>
                            <p>+5 (036) 447 37 38</p>
                        </div>
                    </div>
                    <div className="tools">
                        <div className='tools_link search' id='search'>
                            <input type="text" placeholder='Search' className='search_input'/>
                            <span onClick={this.openSearchBar} className='search_icon'>{searchIcon()}</span>
                        </div>
                        <Link onClick={this.checkOpenedDropDowm} className='tools_link' to='/cart'>
                            {cartIcon()}
                        </Link>
                        <Link onClick={this.checkOpenedDropDowm} className='tools_link' to='/account'>
                            {accountIcon()}
                        </Link>
                    </div>
                </div>
                <ul id='dropDownMenu' className='category'>
                    <li onClick={this.checkOpenedDropDowm} className='category_item'><Link to='/category/all'>All
                        books</Link></li>
                    <li onClick={this.checkOpenedDropDowm} className='category_item'><Link
                        to='/category/html/css'>HTML/CSS</Link></li>
                    <li onClick={this.checkOpenedDropDowm} className='category_item'><Link
                        to='/category/javascript'>JavaScript</Link></li>
                    <li onClick={this.checkOpenedDropDowm} className='category_item'><Link
                        to='/category/pyton'>Pyton</Link></li>
                    <li onClick={this.checkOpenedDropDowm} className='category_item'><Link to='/category/php'>PHP</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;