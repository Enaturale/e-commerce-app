import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    // justifyContent: 'space-between',
    display: 'flex'
    
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  removeButton:{
      marginLeft: '20px'
  }
}));