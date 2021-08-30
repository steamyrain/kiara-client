import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

interface KiaraAppBarProps {
  appBarCName?: string;
  menuButtonCName?: string;
  menuButtonOnClick?: () => void;
}

const KiaraAppBar = (props: KiaraAppBarProps) => {
  return (
    <AppBar position="fixed" className={props.appBarCName}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={props.menuButtonCName}
          onClick={props.menuButtonOnClick}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default KiaraAppBar;
