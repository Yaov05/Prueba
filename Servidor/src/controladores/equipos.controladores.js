const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '0519',
    database: 'cuadrangular',
    port: '5432'
})

const equiposCtrl = {}

equiposCtrl.obtenerEquipos = async (req, res) => {
    const response = await pool.query('SELECT * FROM Equipos');
    res.status(200).json(response.rows);
}

equiposCtrl.registrarEquipo = async (req, res) => {
    const { nombre } = req.body;
    const response = await pool.query('INSERT INTO Equipos (nombre, partidosJugados, puntos, difGol, golFavor) VALUES ($1, $2, $3, $4, $5)', [nombre, 0, 0, 0, 0]);
    res.json({
        message: 'Equipo registrado xdxd',
        body: {
            Equipo: { nombre }
        }
    });
}
equiposCtrl.borrarEquipo = async (req, res) => {
    const nombre = req.params.nombre;
    const response = await pool.query('DELETE FROM Equipos WHERE nombre = $1', [nombre]);
    console.log(response);
    res.json('Equipo eliminado correctamente.');
}
equiposCtrl.actualizarEquipo = async (req, res) => {
    const nombre = req.params.nombre;
    const response = await pool.query('SELECT * FROM Equipos WHERE nombre = $1', [nombre]);
    const {id, nombree, partidosjugados, puntos, difGol, golFavor} = response;
    const response2 = await pool.query('UPDATE Equipos SET partidosjugados = $1, puntos = $2, difGol = $3, golFavor = $4 WHERE nombre = $5', [
        partidosjugados+1,
        puntos+3,
        difGol,
        golFavor,
        nombre
    ]);
    res.send('El equipo fue actualizado');
    /*
    const response1 = await pool.query('UPDATE Equipos SET partidosjugados = $1, puntos = $2, difGol = $3, golFavor = $4 WHERE nombre = $5', [
        partidosjugados+1,
        puntos,
        difGol,
        golFavor,
        nombre
    ]);
    console.log(response);
    res.send('El equipo fue actualizado');*/
}

module.exports = equiposCtrl;