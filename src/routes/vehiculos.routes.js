import { Router } from "express";
import { getVehiculo, getVehiculos, postVehiculo, putVehiculo, deleteVehiculo } from "../controllers/vehiculos.controller.js";

const vehiculosRouter = Router();

vehiculosRouter.get('/vehiculos', getVehiculos)
vehiculosRouter.get('/vehiculos/:id', getVehiculo)
vehiculosRouter.post('/vehiculos', postVehiculo)
vehiculosRouter.put('/vehiculos/:id',putVehiculo)
vehiculosRouter.delete('/vehiculos/:id',deleteVehiculo)
export default vehiculosRouter;