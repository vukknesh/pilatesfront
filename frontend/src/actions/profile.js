import axios from "axios";
import {
  GET_PROFILE,
  // USER_LOADING,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  CLEAR_PROFILES,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

const api = "http://67.207.91.188:1234/";
//get current profile

export const getCurrentProfile = id => (dispatch, getState) => {
  dispatch(setProfileLoading);
  axios
    .get(api + `api/profiles/${id}/`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// myprofile
export const getMyProfile = id => (dispatch, getState) => {
  dispatch(setProfileLoading);
  axios
    .get(api + `api/profiles/${id}/`)
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getProfileByHandle = id => dispatch => {
  dispatch(setProfileLoading);
  axios
    .get(api + `api/profiles/${id}/`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// update profile
export const updateProfile = (
  profileData,

  id,
  token,
  history
) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .put(api + `api/profiles/${id}/`, profileData, config)

    .then(history.push(`/profilebyhandle/${id}/`))

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile Loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Loading

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const clearAllProfiles = () => {
  return {
    type: CLEAR_PROFILES
  };
};

// GET PROFILES
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(api + "api/profiles/")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const getProfilesByName = name => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(api + `api/users/?multi_name_fields=${name}`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const facebookLogin = user => {
  return {
    type: SET_CURRENT_USER,

    payload: user
  };
};
