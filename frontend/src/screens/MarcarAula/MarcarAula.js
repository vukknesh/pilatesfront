import React, { useEffect, useState } from "react";
import axios from "axios";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

import {
  MuiPickersUtilsProvider, KeyboardTimePicker,
  KeyboardDatePicker
} from 'material-ui-pickers/MuiPickersUtilsProvider'
const MarcarAula = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [click, setClick] = useState(false);
  const [aulas, setAulas] = useState([]);
  useEffect(() => {
    async function buscarEventos() {
      const res = await axios.get("http://67.207.91.188:1234/api/eventos");
      console.log(res.data);
      setAulas(res.data);
    }
    buscarEventos();
  }, [click]);
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  return (
    <div>
      <h1>Teste</h1>
      <button onClick={() => setClick(!click)}>Click</button>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      {aulas.map(aula => (
        <div key={aula.id}>
          <h1>{aula.comentario}</h1>
          <h1>{aula.user.first_name}</h1>
        </div>
      ))}
    </div>
  );
};
export default MarcarAula;
