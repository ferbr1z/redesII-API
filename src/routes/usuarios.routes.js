import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsarios, putUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', getUsuario)
router.post('/usuarios', postUsarios)
router.put('/usuarios/:id',putUsuario)
router.delete('/usuarios/:id',deleteUsuario)
export default router;