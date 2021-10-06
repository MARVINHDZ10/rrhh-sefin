import React from 'react';
import '../css/NavbarMovil.css';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

function NavbarMovil({state, setState}) {

  function showMenu() {
    setState({showMenu: !state.showMenu});
  }

  return (
    <div className='div_nav_movil'>
      <HomeIcon className='icon_navbarmovil'></HomeIcon>
      <MailIcon className='icon_navbarmovil'></MailIcon>
      <InfoIcon className='icon_navbarmovil'></InfoIcon>
      <MenuIcon className='icon_navbarmovil menu_active' onClick={showMenu}></MenuIcon>
    </div>
  );
}

export default NavbarMovil;