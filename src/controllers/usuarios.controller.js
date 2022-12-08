
import { pool } from "../db.js";

// devuelve todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT id,nombre FROM usuarios');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Obtiene usuario desde id
export const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT id,nombre FROM usuarios WHERE id=?', [id]);

        // si la longitud es igual o menor a 0, es porque no ha encontrado coincidencias en la BD
        if (result.length <= 0) {
            return res.status(404).json({
                msg: "Usuario no existente"
            });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error })
    }
}

// Necesita nombre y pass para crear usuario
export const postUsuario = async (req, res) => {
    try {
        const { nombre, pass } = req.body;

        const [userExiste] = await pool.query("select * from usuarios where nombre=?", [nombre]);
        if (userExiste.length > 0) {
            res.status(500).json({
                "error": "Ya existe un usuario con ese nobmre"
            })
        } else {
            await pool.query('INSERT INTO usuarios(nombre,pass) VALUES(?,?)', [nombre, pass]);
            res.status(201).json({
                "msg": "usuario creado"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}

export const putUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, pass } = req.body;

        const [result] = await pool.query('UPDATE usuarios SET nombre=IFNULL(?,nombre), pass=IFNULL(?,pass) WHERE id=?', [nombre, pass, id])

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                "msg": "Usuario inexistente"
            });
        }

        const [user] = await pool.query('SELECT id,nombre FROM usuarios WHERE id=?', [id]);

        res.status(200).json({
            "msg": "Usuario modificado",
            user
        })

    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query('DELETE FROM usuarios WHERE id=?', [id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                "msg": "Usuario inexistente"
            });
        }

        res.status(200).json({
            "msg": "Usuario eliminado"
        })

    } catch (error) {
        res.status(500).json({ error })
    }
}