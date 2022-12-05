import { Router } from "express";
import { postCliente, deleteCliente, getCliente, getClientes, putCliente } from "../controllers/clientes.controllers.js";


const clientesRouter = Router();

clientesRouter.get('/clientes', getClientes)
clientesRouter.get('/clientes/:id', getCliente)
clientesRouter.post('/clientes', postCliente)
clientesRouter.put('/clientes/:id',putCliente)
clientesRouter.delete('/clientes/:id',deleteCliente)
export default clientesRouter;