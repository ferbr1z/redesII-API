
import { pool } from "../db.js";

export const getVehiculos = async (req, res) => {
    try {
        const [result] = await pool
        .query('SELECT vehiculos.id,marca,matricula,usuarios.id AS duenho, usuarios.nombre FROM vehiculos INNER JOIN usuarios ON vehiculos.duenho = usuarios.id');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const getVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool
        .query('SELECT vehiculos.id,marca,matricula,usuarios.id AS duenho, usuarios.nombre FROM vehiculos INNER JOIN usuarios ON vehiculos.duenho = usuarios.id WHERE vehiculos.id=?', [id]);
        if (result.length <= 0) {
            return res.status(404).json({
                msg: "Vehiculo no existente"
            });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const postVehiculo = async (req, res) => {
    try {
        const { marca, matricula, duenho } = req.body;
        await pool.query('INSERT INTO vehiculos(marca,matricula,duenho) VALUES(?,?,?)', [marca, matricula, duenho]);
        res.status(200).json({
            "msg": "Vehiculo creado"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
}

export const putVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, matricula } = req.body;

        const [result] = await pool.query('UPDATE vehiculos SET marca=IFNULL(?,marca), matricula=IFNULL(?,matricula) WHERE id=?', [marca, matricula, id])

        if(result.affectedRows <= 0){
            return res.status(404).json({
                "msg":"Vehiculo inexistente"
            });
        }

        const [vehiculo] = await pool.query('SELECT id,marca,matricula FROM vehiculos WHERE id=?', [id]);

        res.status(200).json({
            "msg":"Vehiculo modificado",
            vehiculo
        })

    } catch (error) {
        res.status(500).json({ error })
    }
}

export const deleteVehiculo = async(req,res)=>{
    try {
        const {id}=req.params;

        const [result] = await pool.query('DELETE FROM vehiculos WHERE id=?', [id]);

    if (result.affectedRows <= 0) {
        return res.status(404).json({
            "msg":"Vehiculo inexistente"
        });
    }

    res.status(200).json({
        "msg":"Vehiculo eliminado"
    })

    } catch (error) {
        res.status(500).json({ error })
    }
}