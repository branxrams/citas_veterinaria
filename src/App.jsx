import { useState, useEffect} from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {

  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []); // Listado de paciente
  const [paciente, setPaciente] = useState({}); // Paciente individual

  useEffect(()=>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes])

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( pac => pac.id !== id);

    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-20 ">
      <Header/>
      <div className="mt-12 md:flex">
        <Form 
          pacientes = {pacientes}
          setPacientes = {setPacientes}
          paciente = {paciente}
          setPaciente = {setPaciente}
        />
        <ListadoPacientes
          pacientes = {pacientes}
          setPaciente = {setPaciente}
          eliminarPaciente = {eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
