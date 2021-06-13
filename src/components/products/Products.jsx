import React from "react";
import { Grid } from "@material-ui/core";
import Product from "../Product/Product";


//creating a products array
const products = [
  { id: 1, name: "Wigs", description: "Bone Straight Hair", price: "$5", image:'https://m.divaswigs.com/assets/cache/f/d/1/ef65ac148d0de0eb7d17a02eb82dd34b.jpg' },
  {
    id: 2,
    name: "Bags",
    description: "Courtney Zara Collection",
    price: "$18",
    image: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/97/437236/1.jpg?2140'
  },
];

const Products = () => {
  return(
  <main>
    <Grid container justify="center" spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  </main>
  );
};

export default Products;
