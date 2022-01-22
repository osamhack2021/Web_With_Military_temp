/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import StudyMenu from "./StudyMenu";
import {Box, Button, Divider, Grow, Paper, Popper, MenuItem, MenuList, IconButton, Stack, Tabs, Tab } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Link } from 'react-router-dom';
import { Menu, Avatar, Badge, Dropdown } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import PersonIcon from '@mui/icons-material/Person';


function RightMenu(props) {
  const user = useSelector((state) => state.user);


  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        console.log(user);
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  if (user.userData) {
    if (!user.userData.isAuth) {
      return (
        <Stack direction="row" spacing={2}>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/ranking/all"
                      >
                        All
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/ranking/group"
                      >
                        Group
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/ranking/user"
                      >
                        User
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
  
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary.contrastText"
            indicatorColor="primary"
          >
            <Tab
              label="Ranking"
              sx={{ color: 'white'}}
              ref={anchorRef}
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            />
          </Tabs>
        </Stack>
      );
    } else {
      return (
        <Stack direction="row" spacing={2}>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/ranking/all"
                      >
                        All
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/ranking/group"
                      >
                        Group
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/ranking/user"
                      >
                        User
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="navigation tabs"
            textColor="primary.contrastText"
            indicatorColor="primary"
          >
            <Tab
              label="Studygroup"
              component={Link}
              to={`/users/${user.userData._id}/groups`}
            />
            <Tab
              label="Ranking"
              ref={anchorRef}
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            />
          </Tabs>
          <IconButton
            color="inherit"
            component={Link}
            to={`/users/${user.userData._id}`}
          >
            <PersonIcon />
          </IconButton>
        </Stack>
      );
    }
  } else {
    return (
      <></>
    );
  }


  
}

export default withRouter(RightMenu);