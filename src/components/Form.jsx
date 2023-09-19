import { useState, useEffect} from "react"
import Error from "./error";

const Form = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintoma] = useState('');

  const [error, setError] = useState(false);

  const buttonStyle = `${paciente.id ? 'bg-green-600 hover:bg-green-700' : ' bg-indigo-600 hover:bg-indigo-700'} rounded-md w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors`

  useEffect(()=>{
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintoma(paciente.sintomas);
    }
  }, [paciente]);


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Valiadacion de formularios
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    //Objeto de paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
    }

    if (paciente.id ) {
      // Editando el registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState );

      setPacientes(pacientesActualizados);
      setPaciente({});

    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);

    }
    
    //Reiniciar el Form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintoma('');

  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
          Añade Pacientes y {' '}
          <span className="text-indigo-600 font-bold">
            Administralos
          </span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        >
          { error && 
            <Error>
              <p>Todos los campos son obligatorios</p>
            </Error>
          }
          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold" >
              Nombre Mascota
            </label>
            <input 
              id="mascota"
              type="text"
              placeholder="Nombre de la mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={ (e)=> {setNombre(e.target.value) }}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold" >
              Nombre Propietario
            </label>
            <input 
              id="propietario"
              type="text"
              placeholder="Nombre del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={ (e)=> {setPropietario(e.target.value) }}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold" >
              E-mail
            </label>
            <input 
              id="email"
              type="email"
              placeholder="Email contacto propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={ (e)=> {setEmail(e.target.value)}}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold" >
              Alta
            </label>
            <input 
              id="alta"
              type="date"
              placeholder="Email contacto propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={ (e)=> {setFecha(e.target.value) }}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold" >
              Sintomas
            </label>
            <textarea
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Describe los sintomas"
              value={sintomas}
              onChange={ (e)=> {setSintoma(e.target.value) }}
            />
          </div>
          <input
            type="submit"
            className = {buttonStyle}
            value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
          />
        </form>
    </div>
  )
}

export default Form