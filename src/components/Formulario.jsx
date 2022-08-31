import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombreMascota, setNombreMascota] = useState('');
  const [nombrePropietario, setNombrePropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombreMascota(paciente.nombreMascota) 
      setNombrePropietario(paciente.nombrePropietario) 
      setEmail(paciente.email) 
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación del formulario
    if ([nombreMascota, nombrePropietario, email, fecha, sintomas].includes('')) {
      console.log('Hay almenos un campo vacío');
      setError(true);
      return;
    }
    setError(false);

    // Objeto de paciente
    const objetoPaciente = {
      nombreMascota,
      nombrePropietario,
      email,
      fecha,
      sintomas,
    }

    if(paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id
      const pacienteActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacienteActualizado)
      setPaciente({})
    }else{
      // Nuevo registro

      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    // console.log(objetoPaciente);


    //Reiniciar el formulario
    setNombreMascota('');
    setNombrePropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }

  return (

    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimientos Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-500 font-bold">Adminístralos</span>
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-2">
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label htmlFor="nombre_mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input type="text" value={nombreMascota} onChange={(e) => setNombreMascota(e.target.value)} id="nombre_mascota" placeholder="Nombre de la Mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md selection:border-indigo-500" />
        </div>

        <div className="mb-5">
          <label htmlFor="nombre_propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input type="text" value={nombrePropietario} onChange={(e) => setNombrePropietario(e.target.value)} id="nombre_propietario" placeholder="Nombre de la Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Correo</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email del Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} id="alta" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
          <textarea id="sintomas" value={sintomas} onChange={(e) => setSintomas(e.target.value)} placeholder="Describe los síntomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
        </div>
        <input type="submit" className="bg-indigo-600  w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
      </form>
    </div>
  )
}

export default Formulario


