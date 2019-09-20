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
        this.orders = [
            {
                "number": "45-433",
                "date": "20.04.2019",
                "user": "user1",
                "books": [{"book_id":"5d762f9be927b13ff5a9b57c", "quantity": 1}, {"book_id": "5d762fcae927b13ff5a9b583", "quantity": 2}],
                "orderTotal": 99.05,
                "currency": "$",
                "delivery_address": {
                    "country": "USA",
                    "city": "Oklahoma City",
                    "street": "2609  Ottis Street"
                }
            },
            {
                "number": "40-433",
                "date": "20.01.2019",
                "user": "user1",
                "books": [{"book_id": "5d762fcae927b13ff5a9b583", "quantity": 2}],
                "orderTotal": 48.05,
                "currency": "$",
                "delivery_address": {
                    "country": "USA",
                    "city": "Oklahoma City",
                    "street": "2609  Ottis Street"
                }
            }
        ];
    }

    // fetchOrders() {
    //     let url = '/api/current';
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data => this.setState({externalData: data}));
    // }

    componentDidMount() {
        //this.fetchOrders();
    }

    getOrders() {
        return this.orders.map(order =>{
            return (
                <div className="PurchaseHistory_order">
                    <Order key={order.number} order={order}/>
                </div>
            );
        });
    }

    render() {
        let orders = this.getOrders();
        return (
            <div className="PurchaseHistory">
                {orders}
            </div>
        );
    }
}

export default PurchaseHistory;
