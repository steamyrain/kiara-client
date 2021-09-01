import React, { useState } from "react";
import KiaraAppBar from "./KiaraAppBar";
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

interface routeComponent {
  verboseName: string;
  component: (props?: any) => JSX.Element;
  props?: Object;
}
export type DrawerRoute = { [route: string]: routeComponent };

interface KiaraDrawerAppBarProps {
  id?: string;
  classes: ClassNameMap<
    "toolBar" | "drawer" | "menuButton" | "drawerPaper" | "appBar"
  >;
  route: DrawerRoute;
}

const KiaraDrawerAppBar = (props: KiaraDrawerAppBarProps) => {
  const classes = props.classes;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div className={classes.toolBar} />
      <Divider />
      <List>
        {Object.keys(props.route).map((route) => (
          <Link
            to={route !== "" ? `/${route}` : "/"}
            key={props.route[route].verboseName}
          >
            <ListItem button>
              <ListItemText
                primary={props.route[route].verboseName}
              ></ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
  return (
    <React.Fragment>
      <KiaraAppBar
        menuButtonCName={classes.menuButton}
        menuButtonOnClick={handleDrawerToggle}
        appBarCName={classes.appBar}
      />
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
};

export default KiaraDrawerAppBar;
