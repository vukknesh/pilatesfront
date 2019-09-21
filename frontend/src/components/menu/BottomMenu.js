import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundImage:
      "linear-gradient(to right bottom, #ffedff, #ffe5f3, #ffdde5, #fdd6d5, #f7d1c6)"
  }
});

export default function BottomMenu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
        label="Recents"
        icon={<RestoreIcon color="white" />}
        value="/profile"
      />

      <BottomNavigationAction
        component={Link}
        to="/marcar-aula"
        value="/marcar-aula"
        label="Favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/"
        value="/"
        label="Nearby"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
}
