import React from 'react';
import {Link,Route} from "react-router-dom";
import {connect} from 'react-redux';
import {reducer as formReducer} from 'redux-form';

import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';

import './App.scss';

function App() {
    return (
        <div className="App">
            <Header/>
            <Route path='/' component={HomePage}/>
            <div className="App-header">
                <h1>WOOK</h1>
            </div>
        </div>
    );
}

export default App;
