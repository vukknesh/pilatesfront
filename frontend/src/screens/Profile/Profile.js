import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const mapState = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default function Profile(props) {
  const auth = useSelector(state => state.auth);
  console.log(auth.isAuthenticated);
  const { isAuthenticated } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated]);
  console.log(auth);
  return (
    <div>
      <button onClick={() => dispatch({ type: "LOGOUT_SUCCESS" })}>
        Logout
      </button>
    </div>
  );
}
