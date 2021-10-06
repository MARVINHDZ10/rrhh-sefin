import React from "react";
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import StorageIcon from '@material-ui/icons/Storage';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import BusinessIcon from '@material-ui/icons/Business';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import GitHubIcon from '@material-ui/icons/GitHub';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CropFreeIcon from '@material-ui/icons/CropFree';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Link } from 'react-router-dom';
import '../css/ListMenu.css';
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: '#BBD5F7',
      color: "#3f51b5",
      "& .MuiListItemIcon-root": {
        color: "#7AABEC"
      },
      "& .span_item": {
        height: '100%',
        width: '3%',
        background: '#7AABEC',
        position: 'absolute',
        right: '0'
      }
    },
    "&$selected:hover": {
      backgroundColor: '#BBD5F7',
      color: "#0058FF",
      "& .MuiListItemIcon-root": {
        color: "#7AABEC"
      },
      "& .span_item": {
        height: '100%',
        width: '3%',
        background: '#7AABEC',
        position: 'absolute',
        right: '0'
      }
    },
  },
  selected: {}
})(MuiListItem);

function ListMenu({state, setState}) {

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(window.location.pathname.split("/").pop() === '' ? '/' : window.location.pathname.split("/").pop());

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setState({showMenu: !state.showMenu});
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <List component='nav'>
        <Link
          to='/'
          className='nav-links'>
          <ListItem button
            selected={selectedIndex === '/'}
            onClick={(event) => handleListItemClick(event, '/')}>
            <ListItemIcon>
              <HomeIcon></HomeIcon>
            </ListItemIcon>
            <ListItemText>Inicio</ListItemText>
            <span className='span_item'></span>
          </ListItem>
        </Link>

        <Link
          to='/pasesalida'
          className='nav-links'>
          <ListItem button
            selected={selectedIndex === 'pasesalida'}
            onClick={(event) => handleListItemClick(event, 'pasesalida')}>
            <ListItemIcon>
              <MailIcon></MailIcon>
            </ListItemIcon>
            <ListItemText>Pases de salida</ListItemText>
            <span className='span_item'></span>
          </ListItem>
        </Link>

        <Link
          to='/sami'
          className='nav-links'>
          <ListItem button
            selected={selectedIndex === 'sami'}
            onClick={(event) => handleListItemClick(event, 'sami')}>
            <ListItemIcon>
              <StorageIcon></StorageIcon>
            </ListItemIcon>
            <ListItemText>SAMI</ListItemText>
            <span className='span_item'></span>
          </ListItem>
        </Link>

        <Link
          to='/siret'
          className='nav-links'>
          <ListItem button
            selected={selectedIndex === 'siret'}
            onClick={(event) => handleListItemClick(event, 'siret')}>
            <ListItemIcon>
              <FilterHdrIcon></FilterHdrIcon>
            </ListItemIcon>
            <ListItemText>SIRET</ListItemText>
            <span className='span_item'></span>
          </ListItem>
        </Link>

        <Link
          to='/siarh'
          className='nav-links'>
          <ListItem button
            selected={selectedIndex === 'siarh'}
            onClick={(event) => handleListItemClick(event, 'siarh')}>
            <ListItemIcon>
              <BusinessIcon></BusinessIcon>
            </ListItemIcon>
            <ListItemText>SIARH</ListItemText>
            <span className='span_item'></span>
          </ListItem>
        </Link>

        <Link
          to='/sniph'
          className='nav-links'>
          <ListItem button
            selected={selectedIndex === 'sniph'}
            onClick={(event) => handleListItemClick(event, 'sniph')}>
            <ListItemIcon>
              <GroupIcon></GroupIcon>
            </ListItemIcon>
            <ListItemText>SNIPH</ListItemText>
            <span className='span_item'></span>
          </ListItem>
        </Link>

        <ListItem button
          selected={selectedIndex === 'sicit'}
          onClick={(event) => { handleListItemClick(event, 'sicit'); handleClick(); }}>
          <ListItemIcon>
            <DeviceHubIcon />
          </ListItemIcon>
          <ListItemText primary="SICIT" />
          <span className='span_item'></span>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button
              selected={selectedIndex === 'Consolidación SIAFI'}
              onClick={(event) => handleListItemClick(event, 'Consolidación SIAFI')}
              className={classes.nested}>
              <ListItemIcon>
                <CreateNewFolderIcon className='sub_item' fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Consolidación SIAFI" />
              <span className='span_item'></span>
            </ListItem>

            <ListItem button
              selected={selectedIndex === 'Consultas BI'}
              onClick={(event) => handleListItemClick(event, 'Consultas BI')}
              className={classes.nested}>
              <ListItemIcon>
                <CropFreeIcon className='sub_item' fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Consultas BI" />
              <span className='span_item'></span>
            </ListItem>

            <ListItem button
              selected={selectedIndex === 'Tableros'}
              onClick={(event) => handleListItemClick(event, 'Tableros')}
              className={classes.nested}>
              <ListItemIcon>
                <DonutLargeIcon className='sub_item' fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Tableros" />
              <span className='span_item'></span>
            </ListItem>
          </List>
        </Collapse>

        <Link
          to='/proyectos'
          className='nav-links'>
          <ListItem button
            selected={selectedIndex === 'proyectos'}
            onClick={(event) => handleListItemClick(event, 'proyectos')}>
            <ListItemIcon>
              <GitHubIcon></GitHubIcon>
            </ListItemIcon>
            <ListItemText>Proyectos Lorem ipsum</ListItemText>
            <span className='span_item'></span>
          </ListItem>
        </Link>

        <Link
          to='/configuracion'
          className='nav-links'>
          <ListItem button
            selected={selectedIndex === 'Configuracion'}
            onClick={(event) => handleListItemClick(event, 'Configuracion')}>
            <ListItemIcon>
              <SettingsIcon></SettingsIcon>
            </ListItemIcon>
            <ListItemText>Configuración</ListItemText>
            <span className='span_item'></span>
          </ListItem>
        </Link>

      </List>
    </div>
  );
}

export default ListMenu;