import React from 'react';

import ProductCard from "../ProductCard/ProductCard";

import './SearchResultSection.scss';

const emptyBook = require('./nothingFound.png');

class SearchResultSection extends React.Component {
    constructor(props) {
        super(props);

        // this.initialNumberOfProductCards = 8;
        // this.addedNumberOfProductCards = 8;


        this.state = {
            externalData: null,
            // numberOfProductCards: this.initialNumberOfProductCards
        };
    }

    fetchData() {
        let {search} = this.props.match.params;
        fetch(`/api/book_search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q:search
            })
        })
            .then(response => response.json())
            .then(data => this.setState({externalData: data}));
    }

    componentDidMount() {
       this.fetchData();
    }

    // handleChange = (e) => {
    //     this.fetchData(e.target.value);
    // };

    // addMoreData = () => {
    //     let numberOfProductCards = this.state.numberOfProductCards + this.addedNumberOfProductCards;
    //     this.fetchData(this.state.sortBy, numberOfProductCards);
    //     this.setState({externalData: data})
    // };

    getProductCardList() {
        let externalDataList = this.state.externalData.slice();
        return externalDataList.map(productCard => <ProductCard key={productCard._id} productCard={productCard}/>)
    }

    render () {
        let list = null;
        let {search} = this.props.match.params
        //let productCardList = [];
        // list = this.getProductCardList();
        if (this.state.externalData === null) {
            return (
            <p>...loading</p>
                )
        } else {
            if (this.state.externalData.length === 0 ) {
                return (
                    <div className="SearchResultSection">
                        <h1 className="SearchResultSection_title">We're  Sorry!</h1>
                        <div className='SearchResultSection__empty'>
                            <h1>We can't seem to find any products that match your search for "{search}"</h1>
                            <img src={emptyBook} alt="nothing found"/>
                        </div>
                        {/* <button id="btn-more" onClick={()=>this.addMoreData()} className="btn-view">View more</button> */}
                    </div>
                );
            } else {
                list = this.getProductCardList();
                return (
                    <div className="SearchResultSection">
                        <h1 className="SearchResultSection_title">Found books by "{search}" search</h1>
                        <div className="SearchResultSection_product-list">
                             {list}
                        </div>
                        {/* <button id="btn-more" onClick={()=>this.addMoreData()} className="btn-view">View more</button> */}
                    </div>
                );
            }   
        }
    }
}

export default SearchResultSection;
