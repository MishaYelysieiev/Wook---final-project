import React from 'react';
import {Link} from "react-router-dom";

import Banner from '../Banner/Banner';


import './HomePage.scss';



class HomePage extends React.Component {


    render() {
        return (
            <main className='HomePage'>
                <Banner/>

            </main>
        );
    }
}

export default HomePage;