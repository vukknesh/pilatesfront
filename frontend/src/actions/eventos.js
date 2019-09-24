import axios from "axios";
import { getProfileByHandle } from "./profile";
import {
  GET_EVENT,
  GET_EVENTS,
  ADD_EVENT,
  CLEAR_EVENTS,
  CLEAR_EVENT,
  DELETE_EVENT,
  EVENT_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";
const api = "http://67.207.91.188:1234/";
//add post

export const addEvent = (eventData, token) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .post(api + "api/eventos/create/", eventData, config)
    .then(res => {
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

// add Event like
export const addLikeEvent = (eventId, history, token) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get(api + `api/eventos/${eventId}/like/`, config)
    .then(res => dispatch(getEvent(eventId)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

//Get post

export const getEvents = () => dispatch => {
  dispatch({ type: EVENT_LOADING });
  axios
    .get(api + "api/eventos/")
    .then(res => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data.results
      });
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

//Get post

export const getEvent = id => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(api + `api/eventos/${id}/`)
    .then(res => {
      dispatch(getProfileByHandle(res.data.user.id));

      dispatch({
        type: GET_EVENT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_EVENT,
        payload: null
      });
    });
};
export const getEventsByCity = city => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(api + `api/eventos/?multi_name_fields=${city}`)
    .then(res => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data.results
      });
    })
    .catch(err => {
      dispatch({
        type: GET_EVENTS,
        payload: null
      });
    });
};

// update hotel
export const updateEvent = (profileData, id, token, history) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .put(api + `api/eventos/${id}/edit/`, profileData, config)
    .then(res => history.push(`/eventByHandle/${id}/`))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

// delete hotel

export const deleteEvent = (id, token, history) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  axios
    .delete(api + `api/eventos/${id}/delete/`, config)

    .then(res => {
      history.push("/my-events");
      dispatch({
        type: DELETE_EVENT,
        payload: id
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};
export const addFollowEvent = (eventId, history, token) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  // history.push(`/eventByHandle/${eventId}/`);

  axios
    .get(api + `api/eventos/${eventId}/follow/`, config)
    .then(res => dispatch(getEvent(eventId)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

//set Loading state

export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};

//clear errorrs

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

//clear events

export const clearEvents = () => {
  return {
    type: CLEAR_EVENTS
  };
};

//clear event
export const clearEvent = () => {
  return {
    type: CLEAR_EVENT
  };
};
