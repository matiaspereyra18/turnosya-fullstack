import TarjetaTurno from './TarjetaTurno';

function ListaTurnos({ turnos, alCancelarTurno }) {
    return (
    <section className="card">
        <h2>📋 Próximos Turnos ({turnos.length})</h2>

        {turnos.length === 0 ? (
        <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>
            No hay turnos registrados actualmente.
        </p>
        ) : (
            turnos.map((t) => (
            <TarjetaTurno key={t.id} turno={t} alCancelar={alCancelarTurno} />
            ))
        )}
    </section>
    );
}

export default ListaTurnos;