import { PORT } from "./src/config/config.js";
import express from "express";
import { pool } from "./src/db.js";
import userRoutes from './src/routes/usuarios.routes.js'
import vehiculosRouter from "./src/routes/vehiculos.routes.js";
import bodyParser from "body-parser";
import clientesRouter from "./src/routes/clientes.routes.js";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// app.use(express.json());

app.use(userRoutes)
app.use(vehiculosRouter)
app.use(clientesRouter)
// /login, /usuarios, /vehiculos, /clientes.



app.get("/", async (req, res) => {
    const [result] = await pool.query("SELECT 1+1 AS RESULT");
    res.json(result);
});

app.listen(PORT, console.log(`Escuchando en el puerto ${PORT}`));