import React from 'react';

import ProductCard from "../ProductCard/ProductCard";

import './CategorySection.scss';

import productCards from "../../fixtures";

//let src = 'https://lh3.googleusercontent.com/nKg4RNiihCsstJyoPazuiAvhET9uawt1R_CaIkNK08VLivV7S27TmfnWhxlDxVZ3xMsmMAlgPvTwOO4uY4jSDCmeox-1XMoj04PomFXYNc5LbzCh_rjWGR4IwGbpvQBjtSu5EjMBX1HOckhZOEONKXd74KRGrixzy-m1esAp9pXzp1C1TQLuNMC5Xj2jR-DgllxszOLZdi_i5WbCtEYb7NhEFQZOOBrH6jOSs2h5RpTLBod0YEOk3q21fZE7GS-x6MnJGTnb7VoY9XkpxOLOYjj-ur_VA_Yz_2SDUF7myCzTJ5qS9nA6qel3jXXWbETdXLXAbh9QMut9AG9pdCLXFzTVfN451mWTx9iE71h6BCoGxK5vXsESk0SEJg5xFHO2t84k3AhyrJuV_kou9Io1NqzxaSrHBZ2QY_7eocs1oPs11lWLlqhVVhMXrPzOMYhZ4ooz-2KqdFvCO4p2949_lvq84X8Y9AnIigH8Ztuh0utcC5GbVio3VyyyUSsGas_13HTWp2aVhO3opWiS9aIZFNe0AZTDPBDynBI1YBBoY8LWx4Z0fqHa7_2yGn3huK2F5EBInGe7n6ksXvx0MapTgEDjoy1aFZdg1QLxG9PvdUQofKdEOxKAO-YHIf2vSw=w1280-h646';


class CategorySection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sortBy: "popularity"};

        this.handleChange = this.handleChange.bind(this);
    }

    getSortedList(list) {
        const listByPopularity = list.slice();
        const listByNewFirst = list.slice();
        const listByPriceUp = list.slice();
        const listByPriceDown = list.slice();

        switch(this.state.sortBy) {
            case "popularity" : return this.sortByPopularity(listByPopularity);
            case "newFirst" :  return this.sortByNewFirst(listByNewFirst);
            case "priceUp" : return this.sortByPriceUp(listByPriceUp);
            case "priceDown" : return this.sortByPriceDown(listByPriceDown);
        }
    }

    addMoreData() {

    }

    sortByPopularity(list) {
        return list.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));

    }
    sortByNewFirst(list) {
        return list;
    }
    sortByPriceUp(list) {
        return list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    sortByPriceDown(list) {
        return list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    getProductCardList(list) {
        return list.map(productCard => <ProductCard key={productCard.id} productCard={productCard} style={{marginBottom: "20px"}}/>)
    }

    handleChange(event) {
        this.setState({sortBy: event.target.value});
    }

    render() {
        const { category } = this.props.match.params;
        const productCardListByCategory = category === "all" ? productCards : productCards.filter(productCard => productCard.category.toLowerCase() === category.toLowerCase());
        const productCardListSorted = this.getSortedList(productCardListByCategory);
        const productCardList = this.getProductCardList(productCardListSorted);

        return (
            <div className="CategorySection">
                <h1 className="CategorySection_title">{category.toUpperCase()} Books</h1>
                <div className="CategorySection_sort">
                    <div className="sort-by">
                        <h3 className="sort-header">Sort by:</h3>
                        <select value={this.state.sortBy} onChange={this.handleChange} className="sort-select">
                            <option value="popularity" className="select-item">popularity</option>
                            <option value="newFirst" className="select-item">new first</option>
                            <option value="priceUp" className="select-item">price up</option>
                            <option value="priceDown" className="select-item">price down</option>
                        </select>
                    </div>
                    <span className="sort-results">{"1-12"} of {productCardList.length} results</span>
                </div>
                <div className="CategorySection_product-list">
                    {productCardList}
                </div>
                <button onClick={this.addMoreData()} className="btn-view">View more</button>
            </div>
        );
    }
}

export default CategorySection;