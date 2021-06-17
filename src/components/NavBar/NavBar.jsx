import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import logo from '../../assets/ecommerce.jpg' 
import useStyles from './styles'


const NavBar = ({totalItems}) => {
    const classes=useStyles();
  return (
    <>
      <AppBar postion="fixed" className={classes.appBar} color="inherit">
          <Toolbar>
              <Typography variant ="h5" className={classes.title} color="inherit">
                  <img  src={logo} alt="Commerce.js" className={classes.image} height="30px" />
                  Bee's Shop
              </Typography>

              <div className={classes.grow} />

              <div className={classes.button} style={{height: '30px'}}>
                  <IconButton aria-label="Show Cart Items" color="inherit" style={{height: '30px', width:'70px'}}>
                      <Badge badgeContent={totalItems} color="secondary">
                          <ShoppingCart />
                      </Badge>
                  </IconButton>
              </div>
          </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
