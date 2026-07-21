import { useState, useEffect } from 'react';
import FormularioTurno from './componentes/FormularioTurnos';
import ListaTurnos from './componentes/ListaTurnos';
import './App.css';

// Dirección de nuestro backend en Node.js
const API_URL = 'http://localhost:3000/api/turnos';

function App() {
  const [turnos, setTurnos] = useState([]);

  // 1. Cargar los turnos desde la base de datos de XAMPP al entrar a la página
  const cargarTurnos = async () => {
    try {
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      setTurnos(datos);
    } catch (error) {
      console.error('Error al conectar con el servidor backend:', error);
    }
  };

  useEffect(() => {
    cargarTurnos();
  }, []);

  // 2. Guardar un turno nuevo en la base de datos
  const agregarTurno = async (nuevoTurno) => {
    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoTurno)
      });

      if (respuesta.ok) {
        const turnoCreado = await respuesta.json();
        // Agregamos a la pantalla el turno devuelto por el backend (con su ID de MySQL)
        setTurnos([...turnos, turnoCreado]);
      } else {
        alert('Hubo un error al guardar el turno en el servidor.');
      }
    } catch (error) {
      console.error('Error en la petición POST:', error);
    }
  };

  // 3. Eliminar un turno de la base de datos
  const cancelarTurno = async (idAEliminar) => {
    try {
      const respuesta = await fetch(`${API_URL}/${idAEliminar}`, {
        method: 'DELETE'
      });

      if (respuesta.ok) {
        // Si el backend lo borró de MySQL, lo quitamos de la pantalla
        setTurnos(turnos.filter((t) => t.id !== idAEliminar));
      } else {
        alert('Hubo un error al eliminar el turno del servidor.');
      }
    } catch (error) {
      console.error('Error en la petición DELETE:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🗓️ TurnoYa</h1>
        <p>Sistema Profesional de Gestión de Citas Médicas</p>
      </header>

      <main className="grid-layout">
        <FormularioTurno alAgregarTurno={agregarTurno} />
        <ListaTurnos turnos={turnos} alCancelarTurno={cancelarTurno} />
      </main>
    </div>
  );
}

export default App;