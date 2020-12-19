import { makeStyles } from '@material-ui/core/styles';

const useLoginStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
  image: {
    backgroundImage: 'url('+require('../../assets/images/loginpage.jpg')+')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  hidden: {
    display: 'none',
  },
  show: {
    display: 'block',
    textAlign: 'center',
    color: '#ff0000',
  },
}));

export default useLoginStyles;