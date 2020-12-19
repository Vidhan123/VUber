import { makeStyles } from '@material-ui/core/styles';

const useMainStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px 0 20px 0',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    color: '#3f51b5',
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: 'bold',
    letterSpacing: '1.5px',
  },
}));

export default useMainStyles;