import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {Search} from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import Popper from '@material-ui/core/Popper'
import {ExpandMore} from '@material-ui/icons';
import { myContext } from '../../Context';
import { UserJwtApi } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import UserSearch from './UserSearch';

const headerStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
  },
  popper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  }
}));

export default function Header() {
  const headerClasses = headerStyle();
  const [openSearchUser, setOpenSearchUser] = useState(false)
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [open1, setOpen1] = React.useState(false);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [open2, setOpen2] = React.useState(false);
  const {logoutApi} = UserJwtApi()
  const userObj = useContext(myContext)
  const navigate = useNavigate()
  const context = useContext(myContext)

  const handleOpenModal = () => {
    setOpenSearchUser(true);
  };

  const handleCloseModal = () => {
    setOpenSearchUser(false);
  };


  const handlePoperClick = (event) => {
    setAnchorEl1(event.currentTarget);
    setOpen1(!open1);
    setOpen2(false)
  };

  // const handleNotifyClick = (event) => {
  //   setAnchorEl2(event.currentTarget);
  //   setOpen2(!open2);
  //   setOpen1(false)
  // }

  const triggerLogout = async () => {
    const logoutRes = await logoutApi()
    userObj.setUserObj(null)
    localStorage.removeItem('userObj')
    context.setChats([])
    context.setSelectedChat(null)

    alert(logoutRes.message)
    navigate('/')
  }

  return (
    <div className={headerClasses.root}>
      <AppBar position="static">
        <Toolbar className={headerClasses.container}>
          <IconButton  onClick={handleOpenModal} edge="start" className={headerClasses.menuButton} color="inherit" aria-label="menu">
            <Search />
          </IconButton>
          <div className={headerClasses.btn}>
            <div>
              
              <div type="button" onClick={handlePoperClick} className={headerClasses.popper}>
                <Avatar alt={userObj?.userObj?.name} src={userObj?.userObj?.picture} />
                <ExpandMore />
              </div>
              <Popper open={open1} anchorEl={anchorEl1} placement='bottom'>
                <div className={headerClasses.paper} onClick={triggerLogout} style={{cursor: 'pointer'}}>
                  <div>{context.userObj?.name}</div>
                  <div>Logout</div>
                </div>
              </Popper>   
              </div>
          </div>
        </Toolbar>
      </AppBar>
      {openSearchUser && <UserSearch open={openSearchUser} handleClose={handleCloseModal} /> }
    </div>
  );
}