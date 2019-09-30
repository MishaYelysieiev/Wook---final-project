import React from 'react';
import {Route} from "react-router-dom";

import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import CategorySection from './components/CategorySection/CategorySection';
import SearchResultSection from './components/SearchResultSection/SearchResultSection';
import Cabinet from './components/Cabinet/Cabinet'
import Footer from './components/Footer/Footer';
import LoginForm from './components/LoginForm/LoginForm'
import Cart from './components/Cart/Cart';

import ProductCardInfo from './components/ProductCardInfo/ProductCardInfo';




import './App.scss';
import Registration from "./components/Registration/Registration";

function App() {

    return (
        <div className="App">
            <Header/>
            <Route exact path='/' component={HomePage}/>
            <Route path='/category/:category' component={CategorySection}/>
            <Route path='/book_search/:search' component={SearchResultSection}/>
            <Route path='/sale' component={CategorySection}/>
            <Route path='/book/' component={ProductCardInfo}/>
            <Route path='/login/' component={LoginForm}/>
            <Route path='/registration/' component={Registration}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/cabinet/' component={Cabinet}/>
            <Footer/>
        </div>

    );

}

export default App;