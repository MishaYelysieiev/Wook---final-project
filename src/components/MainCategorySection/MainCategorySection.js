import React from 'react';


import './MainCategorySection.scss'
import ProductCard from "../ProductCard/ProductCard";

class MainCategorySection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            externalData: null
        };
    }

    // fetchData(sortBy = "-rating") {
    //     fetch(`http://localhost:3001/book/filter/?category=&order=${sortBy}&skip=0&limit=4`)
    //         .then(response => response.json())
    //         .then(data => this.setState({externalData: data}));
    // }
    //
    // componentDidMount() {
    //     this.fetchData();
    // }

    componentDidMount() {
        fetch(`http://localhost:3001/book/filter/?category=&order=${this.props.sortBy}&skip=0&limit=4`)
                .then(response => response.json())
                .then(data => this.setState({externalData: data}));
    }

    getProductCardList() {
        let externalDataList = this.state.externalData;
        return externalDataList.map(productCard => <ProductCard key={productCard._id} productCard={productCard}/>)
    }

    render() {
        let list = [];
        if (this.state.externalData) {
            list = this.getProductCardList();
        }
        return (
            <div className='MainCategorySection'>
                <h1 className='MainCategorySection_title'>{this.props.title}</h1>
                <div className='MainCategorySection_products'>
                    {list}
                </div>


            </div>
        )
    }

}

export default MainCategorySection;