import React from 'react';
import {Link, NavLink, Route} from "react-router-dom";

import ContactInformation from "../ContactInformation/ContactInformation";
import AddressEditing from "../AddressEditing/AddressEditing";
import PurchaseHistory from "../PurchaseHistory/PurchaseHistory";


import './Cabinet.scss';


class Cabinet extends React.Component {

    logOut = () => {
        document.cookie = '_login = ;max-age=0';
        window.location.href = '/';
    };

    render() {
        return (
            <div className="Cabinet">
                <ul className='Cabinet_nav'>
                    <li className="nav-item"><NavLink to='/cabinet/contact-information' activeClassName="active">Contact information</NavLink></li>
                    <li className="nav-item address"><NavLink to='/cabinet/address-editing' activeClassName="active">Address editing</NavLink></li>
                    <li className="nav-item history"><NavLink to='/cabinet/purchase-history' activeClassName="active">Purchase history</NavLink></li>
                    <li className="nav-item exit" onClick={this.logOut}>Log out</li>
                </ul>
                <Route path='/cabinet/contact-information' component={ContactInformation}/>
                <Route path='/cabinet/address-editing' component={AddressEditing}/>
                <Route path='/cabinet/purchase-history' component={PurchaseHistory}/>
            </div>
        );
    }
}

export default Cabinet;
