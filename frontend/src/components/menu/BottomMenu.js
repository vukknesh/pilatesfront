import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { withStyles } from "@material-ui/core/styles";

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.text.secondary,

    color: "white",
    "&$selected": {
      // color: theme.palette.primary.main,
      color: "red",
      background: "rgba(111,222,222,0.3)"
    }
  },
  /* Styles applied to the root element if selected. */
  selected: {}
});

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 219381293812,
    backgroundImage:
      "linear-gradient(to right bottom, #ffedff, #ffe5f3, #ffdde5, #fdd6d5, #f7d1c6)"
  }
});

function BottomMenu(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const actionClasses = props.classes;
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/profile"
        label="Perfil"
        classes={actionClasses}
        icon={<RestoreIcon color="white" />}
        value="/profile"
      />

      <BottomNavigationAction
        component={Link}
        to="/marcar-aula"
        value="/marcar-aula"
        label="Aulas"
        classes={actionClasses}
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/"
        value="/"
        classes={actionClasses}
        label="Sair"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
}

export default withStyles(styles)(BottomMenu);
