import React from 'react'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import KegiatanHarianForm from './KegiatanHarianForm'
import KiaraAppBar from './KiaraAppBar'
import {makeStyles} from '@material-ui/core/styles'
import {Container,CssBaseline} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow:1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
}))

const App = ()=>{
  const classes = useStyles();
  return (
  <div className={classes.root}>
    <CssBaseline />
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <KiaraAppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Container>
            <KegiatanHarianForm />
          </Container>
      </main>
    </MuiPickersUtilsProvider>
  </div>
  )
}
export default App
