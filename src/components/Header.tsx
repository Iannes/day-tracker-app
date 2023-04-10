import React, { useState } from "react";

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

import "../styles/Header.css"

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  const list = (
    <div
      className="list"
      role="presentation"
      onClick={handleMenu}
      onKeyDown={handleMenu}
    >
      <List>
        <ListItem>
          <ListItemText primary="Home" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="About" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="rootAppBar">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
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
