import React from 'react'
//this page will contain the description for each individual product such as the image and title

import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';
import useStyles from './styles'

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();

   
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className = {classes.media}  image ={product.media.source} title={product.name} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5" >
                            {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    <div>
                        <Typography  dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" />
   
                    </div>
                </CardContent>

                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                        <AddShoppingCart  />
                    </IconButton>
                </CardActions>

            </Card>
            
        </div>
    )
}

export default Product;
