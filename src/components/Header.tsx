import React, { useState } from "react";
import { Logout } from "@mui/icons-material";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { signOut } from "firebase/auth";
import { useAppAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "./AppRouter";

import "../styles/Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useAppAuth();
  const navigate = useNavigate()

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      localStorage.removeItem('accessToken');
      navigate(AppRoutes.Login)
    }).catch((error) => {
      console.error(error);
    });
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
            <Button
              onClick={handleLogout}
              color="secondary"
            >
          <Logout />
            </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleMenu}>
        {list}
      </Drawer>
    </div>
  );
};

export default Header;
