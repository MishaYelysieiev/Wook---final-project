import React from 'react';
import {Link} from "react-router-dom";

import Banner from '../Banner/Banner';
import SubscribeSection from '../SubscribeSection/SubscribeSection';


import './HomePage.scss';



class HomePage extends React.Component {


    render() {
        return (
            <main className='HomePage'>
                <Banner/>
            <SubscribeSection/>
            </main>
        );
    }
}

export default HomePage;