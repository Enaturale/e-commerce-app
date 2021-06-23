import React, {useState, useEffect} from 'react'
import { Button, CircularProgress, Typography, Step, Stepper, Divider, Paper, StepLabel } from '@material-ui/core'

import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from "../PaymentForm"

import {commerce} from '../../../lib/commerce'

const steps =['Shipping address' , 'Payment details']

const Checkout = ({cart}) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);

    //checkout token for checkout
    useEffect(() =>{
        const generateToken = async () =>{
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type:'cart'});
                // console.log(token);
                setCheckoutToken(token);
            }catch(error){

            }
        }
        generateToken();

    }, [cart])

    const Form  =() => activeStep === 0
    ? <AddressForm checkoutToken ={checkoutToken} />
    : <PaymentForm />

    const Confrimation = () => (
        <div>
            Confrimation
        </div>

    )    

    return (
        <>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confrimation /> : checkoutToken && <Form /> }

            </Paper>
        </main>             
        </>
    )
}

export default Checkout
