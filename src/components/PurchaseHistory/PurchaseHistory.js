import React from 'react';

import './PurchaseHistory.scss';
import Order from "../Order/Order"

class PurchaseHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            externalData: null,
            bookData: null
        };
    }

    fetchOrders() {
        let bearer = document.cookie.split(';').filter(el => el.includes('_login'))[0].split('=')[1];
        let url = '/user/order';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({externalData: data}));
    }

    componentDidMount() {
        this.fetchOrders();
    }

    getOrders() {
        return this.state.externalData.map(order => <Order key={order.number} order={order}/>);
    }

    render() {
        let orders = '';
        if(this.state.externalData) {
            orders = this.getOrders();
        }
        else {
            orders = <div className="PurchaseHistory_empty"><h1>There is no history to show, please make some order before!</h1></div>
        }
        return (
            <div className="PurchaseHistory">
                {orders}
            </div>
        );
    }
}

export default PurchaseHistory;
