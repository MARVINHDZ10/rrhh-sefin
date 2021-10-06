import React from 'react';
import '../css/Navbar.css';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InfoIcon from '@material-ui/icons/Info';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import { Avatar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { Divider, Popover } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import { ButtonCustomized } from '../components/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as moment from 'moment';
import 'moment/locale/es'
moment.locale('es')

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    '&:hover': {
      background: 'none',
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    float: 'right',
    color: 'white',
    backgroundColor: 'cornflowerblue !important'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Navbar({keycloak, state}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;  

  const onShowInfoUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    //this.props.history.push('/');
    keycloak.logout();
  }

  return (
    <div className='div_nav'>
      <div className='div_dateNow col-12'>
        <DateRangeIcon className='dateNow_icon' />
        <a className="a_header_date" href='/#'>{moment().locale('es').format('dddd, D MMMM YYYY')}</a>
      </div>

      <div className='div_navbar'>
        <img alt='img' src='https://gabexpress.com.br/home/wp-content/uploads/2019/12/icon-1.png'
          width='90'
          height='70' />
        <div className='div_icon_header'>
          <InfoIcon fontSize='large' className='info_icon small' />
          <IconButton className={classes.button} style={{ marginRight: '25px' }}>
            <Badge badgeContent={15} color="secondary">
              <NotificationsIcon fontSize='large' className='bell_icon' />
            </Badge>
          </IconButton>
          <Avatar fontSize='small' className={classes.small} onClick={onShowInfoUser}>{state.usersession.primer_nombre.charAt(0).toUpperCase()}{state.usersession.primer_apellido.charAt(0).toUpperCase()}</Avatar>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }} >
            <div className='div_infouser'>
              <div className='col-12 div_name_info'>
                {state.usersession.primer_nombre} {state.usersession.primer_apellido} 
              </div>
              <div className='col-12 div_correo_info'>
                <Typography variant="inherit">
                {state.usersession.correo_trabajo} 
                </Typography>
              </div>
              <Divider />
              <div className='col-12 div_button_info'>
                <ButtonCustomized clase='button_info'
                  buttonColor='primary'
                  buttonSize='medium'
                  onClick={logout}>Salir</ButtonCustomized>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Navbar;