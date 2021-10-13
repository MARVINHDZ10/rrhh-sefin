import React from 'react';
import { Divider, Popover } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import { ButtonCustomized } from './Button';

function UserInfoPopover(props) {
  console.log(props.tanchorEl);
  const open = Boolean(props.tanchorEl);
  const id = open ? 'simple-popover' : undefined;  

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
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
          Marvin Omar Hernandez Chavez
        </div>
        <Divider />
      </div>
    </Popover>
  );
}

export default UserInfoPopover;