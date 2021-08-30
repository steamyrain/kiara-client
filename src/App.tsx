import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import KegiatanHarianForm from "./KegiatanHarianForm";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@material-ui/core";
import KiaraDrawerAppBar, { DrawerRoute } from "./KiaraDrawerAppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import KiaraDashboard from "./KiaraDashboard";
import KiaraTable from "./KiaraTable";
const drawerWidth = 240;

const useStylesKiaraDrawerAppBar = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    toolBar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

const App = () => {
  const classes = useStylesKiaraDrawerAppBar();
  const routes: DrawerRoute = {
    "": { verboseName: "Dashboard", component: KiaraDashboard },
    kegiatanharian: {
      verboseName: "Kegiatan Harian",
      component: KiaraTable,
    },
  };
  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={LuxonUtils} locale="id">
        <CssBaseline />
        <Router>
          <KiaraDrawerAppBar classes={classes} route={routes} />
          <main className={classes.content}>
            <div className={classes.toolBar} />
            <Container maxWidth="lg">
              <Switch>
                {Object.keys(routes).map((route) => {
                  let Component = routes[route].component;
                  return (
                    <Route
                      key={routes[route].verboseName}
                      exact={route === ""}
                      path={`/${route}`}
                    >
                      <Component />
                    </Route>
                  );
                })}
              </Switch>
            </Container>
          </main>
        </Router>
      </MuiPickersUtilsProvider>
    </div>
  );
};
export default App;
