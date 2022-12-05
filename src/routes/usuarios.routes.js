import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', getUsuario)
router.post('/usuarios', postUsuario)
router.put('/usuarios/:id',putUsuario)
router.delete('/usuarios/:id',deleteUsuario)
export default router;