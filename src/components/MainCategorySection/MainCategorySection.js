import React from 'react';
import {Link} from 'react-router-dom';

import './MainCategorySection.scss'
import ProductCard from "../ProductCard/ProductCard";

class MainCategorySection extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className='MainCategorySection'>
                <h1 className='MainCategorySection_title'>{this.props.title}</h1>
                <div className='MainCategorySection_products'>
                    <ProductCard title='Programming in Objective-C' author='Stephen G. Kochan' price='11,45'
                                 stoke={false} src='http://cyfroteka.pl/catalog/ebooki/02031357/020/cover/1/257700.jpg'/>
                    <ProductCard title='Developing Large Web Applications: Producing Code That Can Grow and Thrive'
                                 author='O’Reilly Publishing' price='12,57'
                                 stoke={false} src='http://cyfroteka.pl/catalog/ebooki/02041987/020/cover/1/268841.jpg'/>
                    <ProductCard title='Python Programming: An
Introduction to Computer Science' author='John Zelle' price='7,5'
                                 stoke={false} src='http://cyfroteka.pl/catalog/ebooki/0407592/040/cover/1/766057-n-a.jpg'/>
                    <ProductCard title='A Smarter Way to Learn JavaScript' author='Mark Myers' price='10,25'
                                 stoke={false} src='http://cyfroteka.pl/catalog/ebooki/02031360/020/cover/1/257624.jpg'/>

                </div>


            </div>
        )
    }

}

export default MainCategorySection;