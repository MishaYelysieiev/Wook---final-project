import React from 'react';
import {Link} from "react-router-dom";

import Banner from '../Banner/Banner';
import MainCategorySection from "../MainCategorySection/MainCategorySection";
import MainCategorySection from "../MainCategorySection/MainCategorySection";

import SubscribeSection from '../SubscribeSection/SubscribeSection';


import './HomePage.scss';




class HomePage extends React.Component {


    render() {
        return (
            <main className='HomePage'>
                <Banner/>
                <MainCategorySection title='New Books'/>
                <MainCategorySection title='Most Popular Books'/>
                <MainCategorySection title='New Books'/>
                <MainCategorySection title='Most Popular Books'/>
            <SubscribeSection/>

            </main>
        );
    }
}

export default HomePage;