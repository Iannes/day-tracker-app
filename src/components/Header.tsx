import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme) => ({
  rootAppBar: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 50
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  }
}));

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={handleMenu}
      onKeyDown={handleMenu}
    >
      <List>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="About" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.rootAppBar}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Day Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleMenu}>
        {list}
      </Drawer>
    </div>
  );
};

export default Header;
