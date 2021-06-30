import React, { useState, useEffect } from "react";

import {
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";

import FormTextField from "./CustomTextField";

import { commerce } from "../../lib/commerce";

import {Link} from 'react-router-dom'

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm(); //to give us all the methods we need to run our form

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const selectCountries = Object.entries(shippingCountries).map(
    ([code, name]) => ({ id: code, label: name })
  );
  const selectSubdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );
  const selectOptions = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formmatted_with_symbol})`,
  }));

  //to fetech the shipping countries from commerce js
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    // console.log(countries)
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  //to fetch the subdivisions of selected countries
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  //to fetch shipping Options
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption})  )}>
          <Grid container spacing={3}>
            <FormTextField  name="firstname" label="First Name" />
            <FormTextField  name="lastname" label="Last Name" />
            <FormTextField  name="address1" label="Address" />
            <FormTextField  name="email" label="Email" />
            <FormTextField  name="city" label="City" />
            <FormTextField  name="zip" label="ZIP / Postal Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {/* {console.log(Object.entries(shippingCountries))} */}
                {selectCountries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivisions</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {/* {console.log(Object.entries(shippingCountries))} */}
                {selectSubdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {selectOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <br />
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
              <Button type="submit"color="primary" variant="contained">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
