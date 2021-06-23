import React, {useState, useEffect} from 'react';

import {Button, Grid, Typography, Select, MenuItem, InputLabel} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';

import FormTextField  from './CustomTextField';

//to impoort countries and subdicvisons from commerce js
import {commerce} from '../../lib/commerce';

const AddressForm = ({checkoutToken}) => {
    const methods = useForm();

    const [shippingCountries, setShippingCountries] =useState([]);
    const [shippingCountry, setShippingCountry] =useState('');
    const [shippingSubdivisions, setShippingSubdivisions] =useState([]);
    const [shippingSubdivision, setShippingSubdivision] =useState('');
    const [shippingOptions, setShippingOptions] =useState([]);
    const [shippingOption, setShippingOption] =useState('');

    //to fetech the shipping countries
    const fetchShippingCountries = async(checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries)
        setShippingCountries(countries);
    }

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id) 
    }, [])

    
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
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivisions</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
