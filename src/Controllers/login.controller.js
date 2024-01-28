const db = require('../Config/db');
const jwt = require('jsonwebtoken');
const ServerAPI = require('../Server/Server');

const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const connection = await db.createConnection();
        const programmer = await connection.get(`
            SELECT * FROM programmers WHERE email = ? AND password = ?
        `, [email, password]);

        await connection.close();

        if (programmer) {
            const token = jwt.sign({ id: programmer.id }, 'tu_secreto_secreto', { expiresIn: '1h' })
            console.log(token);
            res.json({ token, programmer });

        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


module.exports = {
    iniciarSesion,
};
