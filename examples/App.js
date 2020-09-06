import React from 'react';
import {
  AppBar, Toolbar, Typography, makeStyles, Container,
} from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyDrawer from './MyDrawer';
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
  content: {
    marginRight: drawerWidth,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <AppBar>
        <Toolbar>
          <Typography>
            react-big-form
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        <Container>
          <Switch>
            {
              routes.map((route) => (
                <Route
                  key={`route-${route.id}`}
                  path={route.path}
                  exact
                >
                  <h1>{route.title}</h1>
                  <route.Component />
                </Route>
              ))
            }
          </Switch>
        </Container>
      </main>
      <MyDrawer />
    </BrowserRouter>
  );
};

export default App;
