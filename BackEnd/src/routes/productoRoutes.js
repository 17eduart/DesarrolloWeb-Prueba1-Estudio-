import express from 'express'

import{
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    modificarProducto,
    borrarProducto
} from "../controllers/productoController.js"
import { verificarToken } from '../middleware/verificarToken.js';

const router = express.Router();

router.get("/", verificarToken,obtenerProductos);
router.get("/:id", obtenerProductoPorId);
router.post("/", crearProducto);
router.put("/:id", modificarProducto);
router.delete("/:id", borrarProducto);

export default router;
