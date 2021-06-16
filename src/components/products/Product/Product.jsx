import React from 'react'
//this page will contain the description for each individual product such as the image and title

import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import useStyles from './styles'

const Product = ({product}) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className = {classes.media}  image ={product.image} title={product.name} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5" >
                            {product.price}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body2" color="textSecondary" >
                            {product.description}
                        </Typography>
                    </div>
                </CardContent>

                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="Add to Cart">
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>

            </Card>
            
        </div>
    )
}

export default Product;