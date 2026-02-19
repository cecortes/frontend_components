// Importar dependencias
import express from "express";
import {
  handleLogin,
  handleRegister,
} from "../controllers/authentication/controller.js";
import { authenticateToken } from "../middlewares/auth.js";

// Crear el router
const router = express.Router();

// Definir la ruta de login
// POST /login
router.post("/login", handleLogin);

// Comentarios para rutas futuras
// POST /register
router.post("/register", handleRegister);

// POST /logout
// router.post('/logout', handleLogout);

// POST /refresh-token
// router.post('/refresh-token', handleRefreshToken);

// GET /verify-token
router.get("/verify-token", authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;
