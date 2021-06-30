import React, { useState, useEffect } from "react";

import { commerce } from "./lib/commerce";

import { Products, NavBar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  //for products
  const [products, setProducts] = useState([]);

  //for the cart
  const [cart, setCart] = useState({});

  //for the order
  const [order, setOrder] = useState({});

  const [errorMessage, setErrorMessage] = useState('');

  //to fetch the products from commerce.js api
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  //function for adding items to the cart
  const handleAddToCart = async (productId, quantity) => {
    const cart = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  //funcion to handel the increase and decrease button of the cart items
  const handleUpdateToCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  //function to handle the removal of an item from the cart
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };
 
  //function to handle the emptying of the cart
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart =async () =>{
    const newCart  = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();

    }catch(error){
      setErrorMessage(error.data.error.message)

    }
 
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  //console.log(products)
  // console.log(cart);

  return (
    <Router>
      <div>
        <NavBar totalItems={cart.total_items} />
        {/*passing the products from the commercejs backend as a prop */}
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart} 
              handleEmptyCart = {handleEmptyCart}
              handleRemoveFromCart = {handleRemoveFromCart}
              handleUpdateToCartQty = {handleUpdateToCartQty}
            />
          </Route>

          <Route exact path="/checkout">
            <Checkout  
            cart={cart}
            order ={order}
            captureCheckout={handleCaptureCheckout}
            error={errorMessage}
            />

          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
