import React, { useEffect, useState } from "react";
import axios from "axios";

const MarcarAula = () => {
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

  return (
    <div>
      <h1>Teste</h1>
      <button onClick={() => setClick(!click)}>Click</button>

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
