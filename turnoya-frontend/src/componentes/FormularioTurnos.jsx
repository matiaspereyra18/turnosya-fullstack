import { useState } from 'react';

function FormularioTurno({ alAgregarTurno }) {
    const [paciente, setPaciente] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

    if (!paciente.trim() || !especialidad || !fecha || !hora) {
        alert('Por favor, completá todos los campos del formulario.');
        return;
    }

    const nuevoTurno = {
        id: Date.now(),
        paciente: paciente.trim(),
        especialidad,
        fecha,
        hora
    };

    alAgregarTurno(nuevoTurno);

    setPaciente('');
    setEspecialidad('');
    setFecha('');
    setHora('');
    };

return (
    <section className="card">
        <h2>📝 Reservar Nuevo Turno</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Nombre del Paciente</label>
            <input type="text" placeholder="Ej: Matías González" value={paciente} onChange={(e) => setPaciente(e.target.value)}/>
        </div>

        <div className="form-group">
            <label>Especialidad</label>
            <select value={especialidad}onChange={(e) => setEspecialidad(e.target.value)}>
                <option value="">Seleccionar especialidad...</option>
                <option value="Clínica Médica">Clínica Médica</option>
                <option value="Odontología">Odontología</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Traumatología">Traumatología</option>
            </select>
        </div>

        <div className="form-group">
            <label>Fecha</label>
            <input type="date" value={fecha}onChange={(e) => setFecha(e.target.value)}/>
        </div>

        <div className="form-group">
            <label>Hora</label>
            <input type="time" value={hora}onChange={(e) => setHora(e.target.value)}/>
        </div>

        <button type="submit" className="btn-primary">
            Confirmar Reserva
        </button>
        </form>
    </section>
    );
}

export default FormularioTurno;