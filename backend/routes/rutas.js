import express from "express";

// Importaciones de Rutas
import * as authRoutes from "../routes/authRoutes.js";
import { authenticateToken } from "../middlewares/auth.js";

/* Importaciones de Controladores */
import * as userControllers from "../controllers/users/controller.js";

const router = express.Router();

// --- Rutas de Auth ---
router.use("/auth", authRoutes.default);

// Aplicar middleware de autenticación a rutas protegidas
router.use("/users", authenticateToken);

// --- Rutas de Usuarios ---
router.post("/users/get/all", userControllers.getAll);
router.post("/users/get/byId", userControllers.getById);
router.post("/users/upd/byId", userControllers.updateById);
router.post("/users/del/byId", userControllers.deleteById);

// Exportación
export default router;
