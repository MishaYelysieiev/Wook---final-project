import React from 'react';

import ProductCard from "../ProductCard/ProductCard";
import Loader from '../Loader/Loader';

import './CategorySection.scss';

class CategorySection extends React.Component {
    constructor(props) {
        super(props);

        this.onScroll = this.onScroll.bind(this);

        this.skipedNumberOfProductCards = 0;
        this.addedNumberOfProductCards = 8;

        this.state = {
            sortBy: "-rating",
            externalData: [],
            pending:true
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

    fetchData(sortBy = this.state.sortBy) {
        let {category: categoryName} = this.props.match.params;
        fetch(`/api/book/filter?category=${this.categoryId[categoryName]}&order=${sortBy}&skip=${this.skipedNumberOfProductCards}&limit=${this.addedNumberOfProductCards}`)
            .then(response => response.json())
            .then(data => {
                // console.log(this.state.externalData);
                this.setState({externalData: this.state.externalData.concat(data), sortBy: sortBy, pending: false});
            });
    }

    componentDidMount() {
       this.fetchData();
       this.scrollListener = window.addEventListener("scroll", this.onScroll, false );
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.category !== prevProps.match.params.category) {
            this.skipedNumberOfProductCards = 0;
            this.setState({externalData: []});
            this.fetchData(this.state.sortBy);
            this.setState({ pending: false});
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false );
    }

    handleChange = (e) => {
        this.skipedNumberOfProductCards = 0;
        this.setState({externalData: []});
        this.fetchData(e.target.value);
        this.setState({ pending: true});
    };

    handleScroll = () => { 
        let lastLi = document.querySelector(".CategorySection_product-list > div.ProductCard:last-child");
        let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        let pageOffset = window.pageYOffset + window.innerHeight;       
        if (pageOffset > lastLiOffset) {
             this.addMoreData();
        } 
    };

    onScroll(e) {
        this.handleScroll(e);
    }

    addMoreData = () => {
        let list = this.getProductCardList();
        if (!(list.length < this.skipedNumberOfProductCards + this.addedNumberOfProductCards)) {
        this.skipedNumberOfProductCards += this.addedNumberOfProductCards;
        this.fetchData(this.state.sortBy);
        }
    };

    getProductCardList() {
        return this.state.externalData.map(productCard => <ProductCard key={productCard._id} productCard={productCard}/>)
    }

    render() {
        if (this.state.pending) {
            return <Loader/>
        } else {
        const {category} = this.props.match.params;
        let list = [];
        if (this.state.externalData) {
            list = this.getProductCardList();
        }
        return (
            <div className="CategorySection">
                <h1 className="CategorySection_title">{CategorySection.getHeader(category)} Books</h1>
                <div className="CategorySection_sort">
                    <div className="sort-by">
                        <h3 className="sort-header">Sort by:</h3>
                        <select value={this.state.sortBy} onChange={(e) => this.handleChange(e)} className="sort-select">
                            <option value="-rating" className="select-item">average rating</option>
                            <option value="date" className="select-item">newness</option>
                            <option value="price" className="select-item">price: low to high</option>
                            <option value="-price" className="select-item">price: high to low</option>
                        </select>
                    </div>
                </div>
                <div className="CategorySection_product-list">
                    {list}
                </div>
            </div>
        );
    }
    }
}

export default CategorySection;
