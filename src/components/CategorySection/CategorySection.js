import React from 'react';

import ProductCard from "../ProductCard/ProductCard";

import './CategorySection.scss';

let src = 'https://lh3.googleusercontent.com/nKg4RNiihCsstJyoPazuiAvhET9uawt1R_CaIkNK08VLivV7S27TmfnWhxlDxVZ3xMsmMAlgPvTwOO4uY4jSDCmeox-1XMoj04PomFXYNc5LbzCh_rjWGR4IwGbpvQBjtSu5EjMBX1HOckhZOEONKXd74KRGrixzy-m1esAp9pXzp1C1TQLuNMC5Xj2jR-DgllxszOLZdi_i5WbCtEYb7NhEFQZOOBrH6jOSs2h5RpTLBod0YEOk3q21fZE7GS-x6MnJGTnb7VoY9XkpxOLOYjj-ur_VA_Yz_2SDUF7myCzTJ5qS9nA6qel3jXXWbETdXLXAbh9QMut9AG9pdCLXFzTVfN451mWTx9iE71h6BCoGxK5vXsESk0SEJg5xFHO2t84k3AhyrJuV_kou9Io1NqzxaSrHBZ2QY_7eocs1oPs11lWLlqhVVhMXrPzOMYhZ4ooz-2KqdFvCO4p2949_lvq84X8Y9AnIigH8Ztuh0utcC5GbVio3VyyyUSsGas_13HTWp2aVhO3opWiS9aIZFNe0AZTDPBDynBI1YBBoY8LWx4Z0fqHa7_2yGn3huK2F5EBInGe7n6ksXvx0MapTgEDjoy1aFZdg1QLxG9PvdUQofKdEOxKAO-YHIf2vSw=w1280-h646';


class CategorySection extends React.Component {

    render() {
        return (

            <div className="CategorySection">


                <ProductCard title='A Smarter Way to Learn
JavaScript' author='Mark Myers' price='10,25'  stoke={false} src={src}/>


            </div>
        );
    }
}

export default CategorySection;