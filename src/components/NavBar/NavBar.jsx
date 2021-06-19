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

import {Link, useLocation} from 'react-router-dom'


const NavBar = ({totalItems}) => {
    const classes=useStyles();
    const location = useLocation();

  
  return (
    <>
      <AppBar postion="fixed" className={classes.appBar} color="inherit">
          <Toolbar>
              <Typography component ={Link} to="/" variant ="h5" className={classes.title} color="inherit">
                  <img  src={logo} alt="Commerce.js" className={classes.image} height="30px" />
                  Bee's Shop
              </Typography>

              <div className={classes.grow} />

              {location.pathname === "/" && (
              <div className={classes.button} style={{height: '30px'}}>
                  <IconButton component ={Link} to="/cart" aria-label="Show Cart Items" color="inherit" style={{height: '30px', width:'70px'}}>
                      <Badge badgeContent={totalItems} color="secondary">
                          <ShoppingCart />
                      </Badge>
                  </IconButton>
              </div>
              )}
          </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
