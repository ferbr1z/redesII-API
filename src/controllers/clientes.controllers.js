
import { pool } from "../db.js";

export const getClientes = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT clientes.id, usuarios.nombre FROM clientes INNER JOIN usuarios ON clientes.usuario=usuarios.id');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const getCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query('SELECT clientes.id, usuarios.nombre FROM clientes INNER JOIN usuarios ON clientes.usuario=usuarios.id WHERE clientes.id=?', [id]);

        if (result.length <= 0) {
            return res.status(404).json({
                msg: "Cliente no existente"
            });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const postCliente = async (req, res) => {
    try {
        const { idUsuario } = req.body;



        await pool.query('INSERT INTO clientes(usuario) VALUES(?)', [idUsuario]);
        res.status(200).json({
            "msg": "Cliente creado"
        })
    } catch (error) {
        res.status(500).json({ error:error.message })
    }
}

export const putCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuarioId } = req.body;

        const [result] = await pool.query('UPDATE clientes SET usuario=IFNULL(?,usuario) WHERE id=?', [usuarioId])

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                "msg": "Cliente inexistente"
            });
        }

        const [cliente] = await pool.query('SELECT clientes.id, usuarios.nombre FROM clientes INNER JOIN usuarios ON clientes.usuario=usuarios.id WHERE id=?', [id]);


        res.status(200).json({
            "msg": "Usuario modificado",
            cliente
        })

    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query('DELETE FROM clientes WHERE id=?', [id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                "msg": "Cliente inexistente"
            });
        }

        res.status(200).json({
            "msg": "Cliente eliminado"
        })

    } catch (error) {
        res.status(500).json({ error })
    }
}