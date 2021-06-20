import React, {useState} from 'react'
import { Button, CircularProgress, Typography, Step, Stepper, Divider, Paper, StepLabel } from '@material-ui/core'
import { classes } from 'istanbul-lib-coverage'
import useStyles from './styles'

const steps =['Shipping address' , 'Payment details']

const Checkout = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    return (
        <>
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={0} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>
        </main>             
        </>
    )
}

export default Checkout
