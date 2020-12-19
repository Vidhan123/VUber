import { makeStyles } from '@material-ui/core/styles';

const useRegisterStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
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
    width: '100%',
    textAlign: 'center',
    color: '#ff0000',
  },
}));

export default useRegisterStyles;