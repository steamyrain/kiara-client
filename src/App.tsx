import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import KegiatanHarianForm from "./KegiatanHarianForm";
import KiaraAppBar from "./KiaraAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
}));

const App = () => {
  const classes = useStyles();
  return (
    <Container>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={LuxonUtils} locale="id">
        <KiaraAppBar />
        <main>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg">
            <KegiatanHarianForm />
          </Container>
        </main>
      </MuiPickersUtilsProvider>
    </Container>
  );
};
export default App;
