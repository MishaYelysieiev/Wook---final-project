import React from 'react';
import ReactDOM from 'react-dom';

import ProductCard from "../ProductCard/ProductCard";

import './CategorySection.scss';

class CategorySection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: "-rating",
            externalData: null,
            numberOfProductCards: 8
        };

        this.categoryId = {
            javascript: "5d5582ab0de3f353d94ceaf6",
            pyton: "5d555850155d165a250ce80f",
            php: "5d5582b00de3f353d94ceaf7",
            html: "5d738845a390a82b1cb4991a",
            all: ""
        };
    }

    static getHeader(category) {
        switch(category) {
            case "html" : return "HTML/CSS";
            case "javascript" : return "JavaScript";
            case "pyton" : return "Pyton";
            case "php" : return "PHP";
            default : return "All";
        }
    }

    fetchData(sortBy = this.state.sortBy, numberOfProductCards = this.state.numberOfProductCards) {
        let {category: categoryName} = this.props.match.params;
        // fetch(`http://localhost:3001/book/filter/?category=${this.categoryId[categoryName]}&order=${sortBy}&skip=0&limit=`)
        fetch(`/book/filter/?category=${this.categoryId[categoryName]}&order=${sortBy}&skip=0&limit=`)
            .then(response => response.json())
            .then(data => this.setState({externalData: data, sortBy: sortBy, numberOfProductCards: numberOfProductCards}));
    }

    componentDidMount() {
        document.addEventListener('click', (e) => this.handleClickOutside(e));
        this.fetchData();
    }
    componentWillUnmount() {
        document.removeEventListener('click', (e) => this.handleClickOutside(e));
    }

    handleClickOutside = (e) => {
        if(e.target.parentNode && e.target.parentNode.classList.contains('category_item')) {
            this.fetchData(this.state.sortBy, 8);
        }
    };

    handleChange = (e) => {
        this.fetchData(e.target.value);
    };

    addMoreData = () => {
        this.setState({numberOfProductCards: this.state.numberOfProductCards + 8});
    };

    getData(list) {
        const newList = [];
        if(this.state.numberOfProductCards <= list.length) {
            for (let i = 0; i < this.state.numberOfProductCards; i++) {
                newList.push(list[i]);
            }
        }
        else {
            for (let i = 0; i < list.length; i++) {
                newList.push(list[i]);
            }
        }
        return newList;
    }

    getProductCardList() {
        let externalDataList = this.state.externalData.slice();
        return externalDataList.map(productCard => <ProductCard key={productCard._id} productCard={productCard}/>)
    }

    render() {
        const {category} = this.props.match.params;
        let list = [];
        let productCardList = [];
        if (this.state.externalData) {
            list = this.getProductCardList();
            productCardList = this.getData(list);
        }
        const button = (list.length > productCardList.length) && <button id="btn-more" onClick={()=>this.addMoreData()} className="btn-view">View more</button>
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
                    <span className="sort-results">{productCardList.length} of {list.length} results</span>
                </div>
                <div className="CategorySection_product-list">
                    {productCardList}
                </div>
                {button}
            </div>
        );
    }
}

export default CategorySection;
