import React from 'react';

import ProductCard from "../ProductCard/ProductCard";
import Loader from '../Loader/Loader';

import './SearchResultSection.scss';

const emptyBook = require('./nothingFound.png');

class SearchResultSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            externalData: null,
            pending: true,
            list: null
            
        };
    }

    async fetchData() {
        let {search} = await this.props.match.params;
        await fetch(`/api/book_search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q:search
            })
        })
            .then(response => response.json())
            .then(data => this.setState({externalData: data, pending: false }));
    }

    async componentDidMount() {
       await this.fetchData();
    }

    getProductCardList() {
        return this.state.externalData.map(productCard => <ProductCard key={productCard._id} productCard={productCard}/>)
    }

     render() {
        let {search} = this.props.match.params
        if (this.state.pending || this.state.externalData === null) {
            return (
                <Loader/>
                )
        } else {
            if (this.state.externalData.length === 0) {
                return (
                    <div className="SearchResultSection">
                        <h1 className="SearchResultSection_title">We're  Sorry!</h1>
                        <div className='SearchResultSection__empty'>
                            <h1>We can't seem to find any products that match your search for "{search}"</h1>
                            <img src={emptyBook} alt="nothing found"/>
                        </div>  
                    </div>
                );
            } else {
                let list =  this.getProductCardList()
                return (                     
                    <div className="SearchResultSection">
                        <h1 className="SearchResultSection_title">Found books by "{search}" search</h1>
                        <div className="SearchResultSection_product-list">
                             {list}
                        </div>
                    </div>
                );
            }   
        }
    }
}

export default SearchResultSection;
