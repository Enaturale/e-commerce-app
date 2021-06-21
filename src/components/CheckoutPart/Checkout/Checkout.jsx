import React, {useState} from 'react'
import { Button, CircularProgress, Typography, Step, Stepper, Divider, Paper, StepLabel } from '@material-ui/core'

import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from "../PaymentForm"

const steps =['Shipping address' , 'Payment details']

const Checkout = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(2);

    const Form  =() => activeStep === 0
    ? <AddressForm />
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
                {activeStep === steps.length ? <Confrimation /> : <Form /> }

            </Paper>
        </main>             
        </>
    )
}

export default Checkout
