function TarjetaTurno({ turno, alCancelar }) {
    return (
        <div className="turno-item">
        <div className="turno-info">
            <h4>👤 {turno.paciente}</h4>
            <p>🩺 <strong>{turno.especialidad}</strong></p>
            <p>📅 {turno.fecha} - ⏰ {turno.hora} hs</p>
        </div>
        <button className="btn-cancelar"onClick={() => alCancelar(turno.id)}>
        Cancelar
        </button>
    </div>
    );
}

export default TarjetaTurno;