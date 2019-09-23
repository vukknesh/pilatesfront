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

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DehazeIcon from '@material-ui/icons/Dehaze';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import NavLink from 'umi/navlink';
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#000000',
    backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 74%)',
    color: 'white'
  },
  selected: {
    color: 'yellow'
  }
});

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.text.secondary,

    color: 'white',
    '&$selected': {
      // color: theme.palette.primary.main,
      color: '#dfa84a',

    },
  },
  /* Styles applied to the root element if selected. */
  selected: {},
});

function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const actionClasses = props.classes;

  return (
    <div style={{
      width: '100%',
      position: 'fixed',
      bottom: '0',

    }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          component={NavLink}
          to="/m-cliente/resumo"
          value="/m-cliente/resumo"
          label="Resumo"
          icon={<DehazeIcon />}
          classes={actionClasses}
        />
        <BottomNavigationAction component={NavLink}
          to="/m-cliente/carteiras"
          value="/m-cliente/carteiras"
          label="Carteiras"
          icon={<AccountBalanceWalletIcon />}
          classes={actionClasses} />
        <BottomNavigationAction component={NavLink}
          to="/m-cliente/evolucao"
          value="/m-cliente/evolucao"
          label="Evolução"
          icon={<TrendingUpIcon />}
          classes={actionClasses} />
      </BottomNavigation>
    </div>

  );
}
export default withStyles(styles)(SimpleBottomNavigation);