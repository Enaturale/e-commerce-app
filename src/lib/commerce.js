import Commerce from '@chec/commerce.js'; //import commerce from commerce.js

//creating a new instance of the Commerce which is our store
//an include the pubic key from the store n the bracket which has been stored in the env file

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);