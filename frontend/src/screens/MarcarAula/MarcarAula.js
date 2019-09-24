import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { DateTimePicker, MuiPickersUtilsProvider } from "material-ui-pickers";

const mapState = state => ({
  token: state.auth.token
});

const MarcarAula = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    moment(new Date().today).format()
  );
  const { token } = useSelector(mapState);
  const [click, setClick] = useState(false);
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function buscarEventos() {
      const res = await axios.get("http://67.207.91.188:1234/api/eventos");
      console.log(res.data);
      setAulas(res.data);
    }
    buscarEventos();
    console.log(moment(selectedDate).format());
  }, [selectedDate]);
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const handleMarcarAula = () => {
    console.log("addEvent");
    setLoading(true);
    const eventData = {
      comentario: "teste",
      starting_date: selectedDate,
      ending_date: moment(selectedDate).add(1, "hours")
    };
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    async function addEvento() {
      const res = await axios.post(
        "http://67.207.91.188:1234/api/eventos/create/",
        eventData,
        config
      );
      console.log(res.data);
      setAulas(res.data);
    }
    addEvento();
    setLoading(false);
  };
  return (
    <div>
      <h1>Marcar Aula</h1>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker value={selectedDate} onChange={handleDateChange} />
      </MuiPickersUtilsProvider>
      <button onClick={() => handleMarcarAula()}>Add aula</button>
    </div>
  );
};
export default MarcarAula;
