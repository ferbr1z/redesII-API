
import { pool } from "../db.js";

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT id,nombre FROM usuarios');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT id,nombre FROM usuarios WHERE id=?', [id]);
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

export const postUsarios = async (req, res) => {
    try {
        const { nombre, pass } = req.body;
        await pool.query('INSERT INTO usuarios(nombre,pass) VALUES(?,?)', [nombre, pass]);
        res.status(200).json({
            "msg": "usuario creado"
        })
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

        if(result.affectedRows <= 0){
            return res.status(404).json({
                "msg":"Usuario inexistente"
            });
        }

        const [user] = await pool.query('SELECT id,nombre FROM usuarios WHERE id=?', [id]);

        res.status(200).json({
            "msg":"Usuario modificado",
            user
        })

    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteUsuario = async(req,res)=>{
    try {
        const {id}=req.params;

        const [result] = await pool.query('DELETE FROM usuarios WHERE id=?', [id]);

    if (result.affectedRows <= 0) {
        return res.status(404).json({
            "msg":"Usuario inexistente"
        });
    }

    res.status(200).json({
        "msg":"Usuario eliminado"
    })

    } catch (error) {
        res.status(500).json({ error })
    }
}