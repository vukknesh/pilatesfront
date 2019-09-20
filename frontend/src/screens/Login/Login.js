import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../../actions/auth";
import './styles.css'
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  //"#ffedff", "#F7D1C6"
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};
export default Login;
