import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";

const Cart = ({ cart }) => {
  const classes = useStyles();
  //const isEmpty ; //variable to say that the cart is empty

  //function to return jsx if the cart is found empty
  const EmptyCart = () => (
    <Typography variant="subtitle1">
     
      You have no items in your cart. Why not add some?{" "}
    </Typography>
  );

  //function to return jsx if the cart is found filled with items
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <div>{item.name}</div>
          </Grid>
        ))}
      </Grid>

      <div className={classes.details}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            variant="contained"
            size="large"
            type="button"
            color="secondary"
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            variant="contained"
            size="large"
            type="button"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  if(!cart.line_items) return "loading..."

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3">
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
