import React, {useState, useEffect} from 'react';

import {Button, Grid, Typography, Select, MenuItem, InputLabel} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';

import FormTextField  from './CustomTextField';

import {commerce} from '../../lib/commerce';

const AddressForm = ({checkoutToken}) => {
    const methods = useForm(); //to give us all the methods we need to run our form

    const [shippingCountries, setShippingCountries] =useState([]);
    const [shippingCountry, setShippingCountry] =useState('');
    const [shippingSubdivisions, setShippingSubdivisions] =useState([]);
    const [shippingSubdivision, setShippingSubdivision] =useState('');
    const [shippingOptions, setShippingOptions] =useState([]);
    const [shippingOption, setShippingOption] =useState('');

    //to fetech the shipping countries from commerce js
    const fetchShippingCountries = async(checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        // console.log(countries)
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    //to fetch the subdivisions of selected countries
    const fetchSubdivisions = async(countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id) 
    }, []);

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    const selectCountries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
    //console.log(selectCountries)
    const selectSubdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}))


    
    return (
        <>
            <Typography variant ="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormTextField required name='firstname' label='First Name' /> 
                        <FormTextField required name='lastname' label='Last Name' /> 
                        <FormTextField required name='address' label='Address' /> 
                        <FormTextField required name='email' label='Email' /> 
                        <FormTextField required name='city' label='City' /> 
                        <FormTextField required name='zip' label='ZIP / Postal Code' /> 
                         <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {/* {console.log(Object.entries(shippingCountries))} */}
                                {selectCountries.map((country) =>(
                                    <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                    </MenuItem>

                                ))}                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivisions</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {/* {console.log(Object.entries(shippingCountries))} */}
                                {selectSubdivisions.map((subdivision) =>(
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                    </MenuItem>

                                ))}                                
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
