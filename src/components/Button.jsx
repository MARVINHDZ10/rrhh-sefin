import React from 'react';
import '../css/Button.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const ButtonCustomized = ({
  children,
  type,
  onClick,
  buttonColor,
  buttonSize,
  clase
}) => {

  const classes = useStyles();

  return (
    <Button variant="contained" 
      onClick={onClick}
      size={buttonSize} 
      color={buttonColor}
      type={type}
      className={`${clase} ${classes.margin}`}>
      {children}
    </Button>
  );
};