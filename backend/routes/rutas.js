import express from "express";

// Importaciones de Rutas
import * as authRoutes from "../routes/authRoutes.js";
import { authenticateToken } from "../middlewares/auth.js";

/* Importaciones de Controladores */
import * as userControllers from "../controllers/users/controller.js";
import * as clientControllers from "../controllers/clients/controller.js";
import * as productControllers from "../controllers/products/controller.js";

const router = express.Router();

// --- Rutas de Auth ---
router.use("/auth", authRoutes.default);

// Aplicar middleware de autenticación a rutas protegidas
router.use("/users", authenticateToken);
router.use("/clients", authenticateToken);
router.use("/products", authenticateToken);

// --- Rutas de Usuarios ---
router.post("/users/get/all", userControllers.getAll);
router.post("/users/get/byId", userControllers.getById);
router.post("/users/upd/byId", userControllers.updateById);
router.post("/users/del/byId", userControllers.deleteById);

// --- Rutas de Clientes ---
router.post("/clients/get/all", clientControllers.getAll);
router.post("/clients/get/byId", clientControllers.getById);
router.post("/clients/new", clientControllers.createNew);
router.post("/clients/upd/byId", clientControllers.updateById);
router.post("/clients/del/byId", clientControllers.deleteById);

// --- Rutas de Productos ---
router.post("/products/get/all", productControllers.getAll);
router.post("/products/get/byId", productControllers.getById);
router.post("/products/new", productControllers.createNew);
router.post("/products/upd/byId", productControllers.updateById);
router.post("/products/del/byId", productControllers.deleteById);

// Exportación
export default router;
