import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middlewares: habilitan el envío de JSON y los permisos entre dominios (CORS)
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL (XAMPP)
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Usuario por defecto de XAMPP
    password: '',      // Contraseña vacía por defecto en XAMPP
    database: 'turnoya_db'
});

console.log('✅ Conectado exitosamente a la base de datos MySQL (XAMPP)');

// ==========================================
// ENDPOINTS DE LA API REST
// ==========================================

// 1. GET: Obtener todos los turnos
app.get('/api/turnos', async (req, res) => {
    try {
        const [filas] = await db.query('SELECT * FROM turnos ORDER BY fecha ASC, hora ASC');
        res.json(filas);
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});

// 2. POST: Crear un turno nuevo
app.post('/api/turnos', async (req, res) => {
    const { paciente, especialidad, fecha, hora } = req.body;

  // Validación rápida de servidor
    if (!paciente || !especialidad || !fecha || !hora) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const query = 'INSERT INTO turnos (paciente, especialidad, fecha, hora) VALUES (?, ?, ?, ?)';
        const [resultado] = await db.query(query, [paciente, especialidad, fecha, hora]);

    // Devolvemos el turno recién creado con su ID autogenerado de MySQL
    res.status(201).json({
        id: resultado.insertId,
        paciente,
        especialidad,
        fecha,
        hora
    });
    } catch (error) {
        console.error('Error al guardar el turno:', error);
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
});

// 3. DELETE: Eliminar un turno por su ID
app.delete('/api/turnos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM turnos WHERE id = ?', [id]);
        res.json({ mensaje: `Turno ${id} eliminado correctamente` });
    } catch (error) {
        console.error('Error al eliminar el turno:', error);
        res.status(500).json({ error: 'Error al eliminar de la base de datos' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Backend corriendo en http://localhost:${PORT}`);
});