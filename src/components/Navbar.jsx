import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Avatar,
  makeStyles,
  alpha,
} from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';

import PushPinIcon from '@mui/icons-material/PushPin';

import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#2F4F4F', // You can customize the background color
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 'auto', // Adjust the width as needed
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div>
          <IconButton color="inherit">
            <PushPinIcon />
          </IconButton>
          <IconButton color="inherit">
            <ShareIcon />
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div>
          <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
          <Typography variant="subtitle1" color="inherit" style={{ marginLeft: 10 }}>
            User_name {/* Replace with the actual user name */}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
