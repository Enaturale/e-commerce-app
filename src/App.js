import React, {useState, useEffect} from 'react';

import { commerce } from './lib/commerce';

import {Products, NavBar} from './components';


const App = () => {
    const [products, setProducts] = useState([]);

    //to fetch the products from commerce.js api
    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);

    }

    useEffect(() => {
        fetchProducts();

    }, []);

    // console.log(products)

    return(

        <div>
            <NavBar />
             <Products  products={products} /> {/*passing the products from the commercejs backend as a prop */}
        </div>
    )
}

export default App;
