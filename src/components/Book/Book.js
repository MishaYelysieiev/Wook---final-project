import React from 'react';

import './Book.scss';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: null
        };
    }

    fetchBook(bookId) {
        let url = `/api/book/${bookId}`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({bookData: data}));
    }

    componentDidMount() {
        let { book } = this.props;
        this.fetchBook(book.book_id);
    }

    render() {
        let bookData = {};
        let author = "";
        let image = "";
        let { book } = this.props;

        if(this.state.bookData) {
            bookData = this.state.bookData;
            author = bookData.author.name;
            image = bookData.image.small;
        }
        return (
            <div className="Book">
                <img src={image} alt="book image" className="Book_image"/>
                <div className="Book_data">
                    <span>{bookData.title}</span>
                    <span className="data-author">by {author}</span>
                </div>
                <span className="Book-quantity">{book.quantity}</span>
                <span className="Book-price">$ {bookData.price}</span>
            </div>
        );
    }
}

export default Book;
