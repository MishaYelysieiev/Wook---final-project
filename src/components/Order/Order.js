import React from 'react';
import Book from "../Book/Book"

import './Order.scss';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: null
        };
    }

    getBooks() {
        const { order } = this.props;
        return order.books.map(book => <Book key={book.id} book={book}/>);
    }

    render() {
        const {order} = this.props;
        const {delivery_address} = this.props.order;
        return (
            <div className="Order">
                <div className="Order_item">
                    <div className="item-data">
                        <span className="item-data-number">Order №{order.number}, </span>
                        <span className="item-data-date">{order.date}</span>
                    </div>
                    <span className="item-state">Delivered</span>
                </div>
                {this.getBooks()}
                <div className="Order_delivery">
                    <div className="delivery-data">
                        <span className="delivery-data-information">Delivery Information </span>
                        <span className="delivery-data-address">{delivery_address.country}, {delivery_address.city}, {delivery_address.street}</span>
                    </div>
                    <div className="delivery-price">
                        <span className="delivery-price-total">Total </span>
                        <span className="delivery-price-amount">{order.currency}{order.orderTotal}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Order;
