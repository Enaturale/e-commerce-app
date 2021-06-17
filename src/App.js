import React, {useState, useEffect} from 'react';

import { commerce } from './lib/commerce';

import {Products, NavBar} from './components';


const App = () => {
    //for products
    const [products, setProducts] = useState([]);

    //for the cart
    const [cart, setCart] = useState({})

    //to fetch the products from commerce.js api
    const fetchProducts = async () => {
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    
    const fetchCart = async () => { 
        setCart( await commerce.cart.retrieve())
    }

    //function for adding items to the cart
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    //console.log(products)
    console.log(cart)

    return(

        <div>
            <NavBar totalItems={cart.total_items} />
             <Products  products={products} onAddToCart={handleAddToCart}/> 
             {/*passing the products from the commercejs backend as a prop */}
        </div>
    )
}

export default App;
