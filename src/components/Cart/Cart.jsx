import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'

const Cart = ({cart}) => {
    const isEmpty = cart.line_items.length === 0; //variable to say that the cart is empty

    //function to return jsx if the cart is found empty
    const EmptyCart =() => {
        <Typography variant ="subtitle1">You have no items in your cart. Why not add some?</Typography>
    };

      //function to return jsx if the cart is found filled with items
    const FilledCart =() => {
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}></Grid>

            ))}

        </Grid>
        </>

    };

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant = "h3">Your Shopping Cart</Typography>
            {isEmpty ? <EmptyCart/> : <FilledCart/> }
        </Container>
    )
}

export default Cart
