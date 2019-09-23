import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const mapState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  myprofile: state.auth.myprofile
});

export default function Profile(props) {
  const auth = useSelector(state => state.auth);
  console.log(auth.isAuthenticated);
  const { isAuthenticated, myprofile } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated]);
  console.log(auth);
  return (
    <div style={{ height: "93vh" }}>

      <button onClick={() => dispatch({ type: "LOGOUT_SUCCESS" })}>
        Logout
      </button>
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
        <p>{myprofile.first_name}</p>
      </div>
    </div>
  );
}
