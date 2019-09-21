import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
export default function Profile() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      {!auth.isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <button onClick={() => dispatch({ type: "LOGOUT_SUCCESS" })}>
          Logout
        </button>
      )}
    </div>
  );
}
