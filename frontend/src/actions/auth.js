import axios from "axios";
import { clearCurrentProfile, clearAllProfiles } from "./profile";
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  GET_ERRORS
} from "./types";
const api = "http://67.207.91.188:1234/";
// CHECK TOKEN & LOAD USER
export const loadUser = myprofile => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get(api + "api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        user: res.data,
        myprofile: myprofile
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS
      });
    });
};

// LOGIN USER
export const login = (username, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post(api + "api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      }).then(dispatch(loadUser(res.data.myprofile)));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

// LOGIN USER with Facecbook
export const faceLogin = username => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username });

  axios
    .post(api + "api/auth/face", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,

        payload: res.data
      });
      dispatch(loadUser());
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

// REGISTER USER
export const register = (
  { username, password, email, first_name },
  history
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({
    username,
    email,
    password,
    first_name
  });

  axios
    .post(api + "api/auth/register", body, config)

    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      dispatch(history.push(`/profilebyhandle/${res.data.user.id}`));
    })

    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  dispatch(clearCurrentProfile());
  dispatch(clearAllProfiles());
  axios
    .post(api + "api/auth/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })

    .catch(err => {
      console.log(err);
    });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
//set logged in user
