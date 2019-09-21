import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import clsx from "clsx";

import logo from "../../assets/logobranca.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import * as authActions from "../../actions/auth";
import "./styles.css";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles(theme => ({
  buttonSuccess: {
    backgroundColor: red[300],
    "&:hover": {
      backgroundColor: red[400]
    }
  },
  buttonProgress: {
    color: red[600],
    position: "absolute"
  }
}));

const Login = () => {
  const auth = useSelector(state => state.auth);
  const classes = useStyles();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  const StyledButton = withStyles({
    root: {
      background: "linear-gradient(45deg, #fdd6d5 30%, #f7d1c6 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 235, .3)"
    },
    label: {
      textTransform: "capitalize"
    }
  })(Button);
  const authHandler = async () => {
    let action;

    action = authActions.login(email, senha);

    setError(null);
    setLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      console.log(error);
      setLoading(false);
    }
  };
  const onSubmitLogin = e => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    authHandler();
    setSuccess(true);
    setLoading(false);
  };
  return (
    <div style={{ height: "93vh" }}>
      {auth.isAuthenticated ? (
        <Redirect to="/profile" />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20%"
            }}
          >
            <img
              src={logo}
              style={{ width: "150px" }}
              alt="pilates em goiania"
            />
          </div>
          <div
            style={{
              height: "200px",
              width: "80%",
              borderRadius: "8px",
              background: "#fff",
              padding: "30px 10px",
              margin: "20% auto"
            }}
          >
            <form onSubmit={onSubmitLogin}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <TextField
                    required
                    id="cardName"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    label="Email"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    required
                    type="password"
                    id="cardNumber"
                    name="senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    label="Senha"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <div
                style={{
                  margin: "20px auto",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <StyledButton
                  variant="contained"
                  color="secondary"
                  className={buttonClassname}
                  disabled={loading}
                  // onClick={handleButtonClick}
                  type="submit"
                >
                  Logar
                </StyledButton>
                {loading && (
                  <CircularProgress
                    size={26}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
