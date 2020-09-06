import React from 'react';
import {
  Drawer, Divider, List, ListItem, ListItemText, makeStyles, ListSubheader,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import routes from './routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    ...theme.mixins.toolbar,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  parentItem: {
    fontWeight: theme.typography.fontWeightBold,
  },
  childrenItem: {
    marginLeft: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

const MyDrawer = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader} />
      <Divider />
      <List>
        <ListSubheader>
          <ListItemText
              // classes={{ container: classes.parentItem }}
            primary="Examples"
          />
        </ListSubheader>
        {
          routes.map((route) => (
            <ListItem
              key={`drawer-${route.id}`}
              button
              component="a"
              href={route.path}
              selected={location.pathname === route.path}
            >
              <ListItemText
                primary={route.title}
              />
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  );
};

export default MyDrawer;
