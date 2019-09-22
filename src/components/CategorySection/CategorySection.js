import React from 'react';

import ProductCard from "../ProductCard/ProductCard";

import './CategorySection.scss';

class CategorySection extends React.Component {
    constructor(props) {
        super(props);

        this.initialNumberOfProductCards = 8;
        this.addedNumberOfProductCards = 8;

        this.state = {
            sortBy: "-rating",
            externalData: null,
            numberOfProductCards: this.initialNumberOfProductCards
        };

        this.categoryId = {
            javascript: "5d5582ab0de3f353d94ceaf6",
            python: "5d555850155d165a250ce80f",
            php: "5d5582b00de3f353d94ceaf7",
            html: "5d738845a390a82b1cb4991a",
            all: ""
        };
    }

    static getHeader(category) {
        switch(category) {
            case "html" : return "HTML/CSS";
            case "javascript" : return "JavaScript";
            case "python" : return "Python";
            case "php" : return "PHP";
            default : return "All";
        }
    }

    fetchData(sortBy = this.state.sortBy, numberOfProductCards = this.state.numberOfProductCards) {
        let {category: categoryName} = this.props.match.params;
        fetch(`/api/book/filter?category=${this.categoryId[categoryName]}&order=${sortBy}&skip=0&limit=${numberOfProductCards}`)
            .then(response => response.json())
            .then(data => this.setState({externalData: data, sortBy: sortBy, numberOfProductCards: numberOfProductCards}));
    }

    componentDidMount() {
       this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.category !== prevProps.match.params.category) {
            this.fetchData(this.state.sortBy, this.initialNumberOfProductCards);
        }
    }

    handleChange = (e) => {
        this.fetchData(e.target.value);
    };

    addMoreData = () => {
        let numberOfProductCards = this.state.numberOfProductCards + this.addedNumberOfProductCards;
        this.fetchData(this.state.sortBy, numberOfProductCards);
    };

    getProductCardList() {
        let externalDataList = this.state.externalData.slice();
        return externalDataList.map(productCard => <ProductCard key={productCard._id} productCard={productCard}/>)
    }

    render() {
        const {category} = this.props.match.params;
        let list = [];
        //let productCardList = [];
        if (this.state.externalData) {
            list = this.getProductCardList();
            //productCardList = this.getData(list);
        }
        //const button = (list.length > productCardList.length) && <button id="btn-more" onClick={()=>this.addMoreData()} className="btn-view">View more</button>
        return (
            <div className="CategorySection">
                <h1 className="CategorySection_title">{CategorySection.getHeader(category)} Books</h1>
                <div className="CategorySection_sort">
                    <div className="sort-by">
                        <h3 className="sort-header">Sort by:</h3>
                        <select value={this.state.sortBy} onChange={(e) => this.handleChange(e)} className="sort-select">
                            <option value="-rating" className="select-item">popularity</option>
                            <option value="date" className="select-item">new first</option>
                            <option value="price" className="select-item">price up</option>
                            <option value="-price" className="select-item">price down</option>
                        </select>
                    </div>
                    {/*<span className="sort-results">{productCardList.length} of {list.length} results</span>*/}
                </div>
                <div className="CategorySection_product-list">
                    {list}
                </div>
                {/*{button}*/}
                <button id="btn-more" onClick={()=>this.addMoreData()} className="btn-view">View more</button>
            </div>
        );
    }
}

export default CategorySection;
