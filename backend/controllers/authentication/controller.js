// Importar dependencias (usando sintaxis ESM)
import {
  loginUser,
  registerUser,
} from "../../services/authentication/service.js";

/**
 * Maneja la petición POST /login
 */
export const handleLogin = async (req, res) => {
  // 1. Extraer datos del body
  const { username, password } = req.body;

  // 2. Validación simple de entrada
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Usuario y contraseña son requeridos.",
      code: 400,
    });
  }

  try {
    // 3. Llamar al servicio para que haga el trabajo
    const token = await loginUser(username, password);

    // 4. Si el servicio fue exitoso, devolver el token
    res.json({
      success: true,
      message: "Login exitoso.",
      token: token,
    });
  } catch (error) {
    // 5. Manejar errores
    // Si es el error de credenciales que lanzamos en el servicio...
    if (error.message === "Credenciales incorrectas") {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas.",
        code: 401,
      });
    }

    // Para cualquier otro error (DB, etc.)
    console.error("Error en controlador de login:", error.message);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
      code: 500,
    });
  }
};

/**
 * handleRegister
 * @async
 * @description: Maneja la petición POST /register.
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const handleRegister = async (req, res) => {
  const { user, mail, name, password, role } = req.body;

  // Validación básica
  if (!user || !password) {
    return res.status(400).json({
      success: false,
      message: "Usuario y contraseña son requeridos.",
    });
  }
  if (typeof user !== "string" || user.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Usuario debe ser una cadena de al menos 3 caracteres.",
    });
  }
  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Contraseña debe ser una cadena de al menos 6 caracteres.",
    });
  }

  try {
    const userId = await registerUser(user, mail, name, password, role);
    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente.",
      userId: userId,
    });
  } catch (error) {
    if (error.message === "Usuario ya existe") {
      return res.status(409).json({
        success: false,
        message: "El usuario ya existe.",
      });
    }
    console.error("Error en controlador de registro:", error.message);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};
