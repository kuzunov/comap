import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import {
  Link as RouterLink,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../users/UserContext";
import { USER_ROLE } from "../../model/user";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { APP_URL, AVATAR_FOLDER, DEFAULT_AVATAR } from "../../evn.var.config";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Popover,
  ClickAwayListener,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Login from "../users/Login";

type Props = {};

const Header = (props: Props) => {
  const { currentUserState, logout } = useAuth();
  const { currentUser } = currentUserState;
  let location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const onLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    navigate(location, { state: { from: location }, replace: true });
  };
  const onLogout = () => {
    if (logout) {
      logout();
      handleClose();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title="Home">
          <NavLink
            to="/"
            end
            children={({ isActive }) => {
              return (
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2, color: isActive ? "action" : "white" }}
                >
                  <HomeIcon />
                </IconButton>
              );
            }}
          /></Tooltip>
          <Tooltip title="Events">
          <NavLink
            to="/events"
            children={({ isActive }) => {
              return (
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2, color: isActive ? "grey" : "white" }}
                >
                  <CalendarMonthIcon />
                </IconButton>
              );
            }}
          /></Tooltip>
          <Tooltip title="Organizations">
          <NavLink
            to="/organizations"
            children={({ isActive }) => {
              return (
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2, color: isActive ? "grey" : "white" }}
                >
                  <Diversity3Icon />
                </IconButton>
              );
            }}
          /></Tooltip>
          <Tooltip title="Users"> 
          <NavLink
            to="/users"
            children={({ isActive }) => {
              return (
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  sx={{ mr: 2, color: isActive ? "grey" : "white" }}
                >
                  <PersonPinIcon />
                </IconButton>
              );
            }}
          /></Tooltip>

          <Typography variant="overline" component="div" sx={{ flexGrow: 1 }}>
            {currentUserState.isLoggedIn
              ? `Hello ${currentUser.username}! You're logged in as ${
                  USER_ROLE[currentUser.role]
                }`
              : "Use the button to Login or Register..."}
          </Typography>
          {!currentUserState.isLoggedIn ? (
            <>
              <IconButton onClick={onLogin} sx={{ color: "white" }}>
                <LoginIcon />
              </IconButton>
              <ClickAwayListener onClickAway={handleClose}>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Login />
                </Popover>
              </ClickAwayListener>
            </>
          ) : (
            <IconButton onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          )}

          {currentUserState.isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Edit Profile">
                <IconButton component={RouterLink} to="profile" sx={{ p: 0 }}>
                  <Avatar
                    alt=""
                    src={
                      currentUserState.currentUser.avatar ||
                      APP_URL +
                        AVATAR_FOLDER +
                        DEFAULT_AVATAR +
                        currentUserState.currentUser.gender +
                        ".jpg"
                    }
                  ></Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
