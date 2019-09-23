import React from 'react';
import {Link,Route} from "react-router-dom";
import {connect} from 'react-redux';
import {reducer as formReducer} from 'redux-form';

import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import CategorySection from './components/CategorySection/CategorySection';
import Cabinet from './components/Cabinet/Cabinet'
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';

import ProductCardInfo from './components/ProductCardInfo/ProductCardInfo';




import './App.scss';

function App() {

    return (
        <div className="App">
            <Header/>
            <Route exact path='/' component={HomePage}/>
            <Route path='/category/:category' component={CategorySection}/>
            <Route path='/book_search' component={CategorySection}/>
            <Route path='/sale' component={CategorySection}/>
            <Route path='/book/' component={ProductCardInfo}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/cabinet/' component={Cabinet}/>
            <Footer/>
        </div>
    );
}

export default App;