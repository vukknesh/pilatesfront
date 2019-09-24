import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
const mapState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  myprofile: state.auth.myprofile,
  user: state.auth.user
});

export default function Profile(props) {
  const { isAuthenticated, myprofile, user } = useSelector(mapState);
  const dispatch = useDispatch();
  const [aulas, setAulas] = useState([]);
  const [buttonPressTimer, setButtonPressTimer] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    async function buscarEventos() {
      const res = await axios.get("http://67.207.91.188:1234/api/eventos");
      dispatch({ type: "GET_EVENTS", payload: res.data });
      console.log(res.data);
      setAulas(res.data);
    }
    buscarEventos();
  }, []);
  const handleButtonPress = id => {
    setButtonPressTimer(
      setTimeout(() => {
        console.log("id: ", id);
        alert("long press activated");
      }, 1500)
    );
  };

  const handleButtonRelease = () => {
    setButtonPressTimer(clearTimeout(buttonPressTimer));
  };

  return (
    <div style={{ height: "93vh", margin: "0" }}>
      {!user ? (
        <h1>loading ...</h1>
      ) : (
        <div>
          <button onClick={() => dispatch({ type: "LOGOUT_SUCCESS" })}>
            Logout
          </button>
          <div
            style={{
              height: "20vh",

              width: "80%",
              borderRadius: "8px",
              background: "#fff",
              padding: "30px 10px",
              margin: "10% auto 10px"
            }}
          >
            <p>{user.first_name}</p>
          </div>
        </div>
      )}
      <h1 style={{ textAlign: "center", color: "#333" }}>Proximas Aulas</h1>
      <div style={{ overflow: "scroll", height: "50vh" }}>
        <ul style={{ listStyle: "none", margin: "0 20px" }}>
          {aulas.length &&
            user &&
            aulas
              .filter(filt => {
                console.log(filt.user.id);
                return filt.user.id === user.id;
              })
              .map((aula, index) => (
                <li
                  onTouchStart={handleButtonPress.bind(
                    this,
                    aula.user.first_name
                  )}
                  onTouchEnd={handleButtonRelease}
                  // onMouseDown={handleButtonPress}
                  // onMouseUp={handleButtonRelease}
                  onMouseLeave={handleButtonRelease}
                  key={index}
                  style={{
                    padding: "20px auto",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    borderRadius: "8px",
                    background: "#333",
                    textAlign: "center",
                    color: "white",
                    marginBottom: "5px"
                  }}
                >
                  {aula.user.first_name}
                  {moment(aula.starting_date).format("DD/MM/YYYY")}
                  <Checkbox
                    style={{ marginRight: "auto" }}
                    checked={aula.user.first_name}
                    // onChange={handleChange("checkedA")}
                    value="first_name"
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
