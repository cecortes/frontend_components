import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../../services/users/service.js";

/**
 * Maneja la petición POST /users/get/all
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 *
 * Ejemplo de respuesta exitosa (status 200):
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "users_id": 1,
 *       "users_name": "Juan Pérez",
 *       "users_mail": "juan@example.com",
 *       "users_user": "juanp",
 *       "users_role": "admin"
 *     },
 *     {
 *       "users_id": 2,
 *       "users_name": "María García",
 *       "users_mail": "maria@example.com",
 *       "users_user": "mariag",
 *       "users_role": "user"
 *     }
 *   ]
 * }
 *
 * Ejemplo de respuesta de error (status 500):
 * {
 *   "success": false,
 *   "message": "Error interno del servidor."
 * }
 */
export const getAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error en controlador getAll:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};

/**
 * Maneja la petición POST /api/waresmart/users/get/byId
 * Requiere autenticación: Authorization: Bearer <token>
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 *
 * Ejemplo de petición:
 * POST /api/waresmart/users/get/byId
 * Headers: Authorization: Bearer <token>
 * Body: { "id": 1 }
 *
 * Ejemplo de respuesta exitosa (status 200):
 * {
 *   "success": true,
 *   "data": {
 *     "users_id": 1,
 *     "users_name": "Juan Pérez",
 *     "users_mail": "juan@example.com",
 *     "users_user": "juanp",
 *     "users_role": "admin"
 *   }
 * }
 *
 * Ejemplo de respuesta de error (status 400):
 * {
 *   "success": false,
 *   "message": "ID inválido. Debe ser un número entero positivo."
 * }
 *
 * Ejemplo de respuesta de error (status 404):
 * {
 *   "success": false,
 *   "message": "Usuario no encontrado."
 * }
 *
 * Ejemplo de respuesta de error (status 500):
 * {
 *   "success": false,
 *   "message": "Error interno del servidor."
 * }
 */
export const getById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || !Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID inválido. Debe ser un número entero positivo.",
      });
    }
    const user = await getUserById(id);
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }
  } catch (error) {
    console.error("Error en controlador getById:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};

/**
 * Maneja la petición POST /api/waresmart/users/upd/byId
 * Requiere autenticación: Authorization: Bearer <token>
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 *
 * Ejemplo de petición:
 * POST /api/waresmart/users/upd/byId
 * Headers: Authorization: Bearer <token>
 * Body: {
 *   "id": 1,
 *   "updateData": {
 *     "name": "Nuevo Nombre",
 *     "mail": "nuevo@example.com",
 *     "user": "nuevouser",
 *     "role": "user"
 *   }
 * }
 *
 * Ejemplo de respuesta exitosa (status 200):
 * {
 *   "success": true,
 *   "message": "Usuario actualizado exitosamente."
 * }
 *
 * Ejemplo de respuesta de error (status 400 para ID inválido):
 * {
 *   "success": false,
 *   "message": "ID inválido. Debe ser un número entero positivo."
 * }
 *
 * Ejemplo de respuesta de error (status 400 para datos inválidos):
 * {
 *   "success": false,
 *   "message": "Datos de actualización inválidos. Debe ser un objeto no vacío."
 * }
 *
 * Ejemplo de respuesta de error (status 404):
 * {
 *   "success": false,
 *   "message": "Usuario no encontrado."
 * }
 *
 * Ejemplo de respuesta de error (status 500):
 * {
 *   "success": false,
 *   "message": "Error interno del servidor."
 * }
 */
export const updateById = async (req, res) => {
  try {
    const { id, updateData } = req.body;
    if (!id || !Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID inválido. Debe ser un número entero positivo.",
      });
    }
    if (
      !updateData ||
      typeof updateData !== "object" ||
      Object.keys(updateData).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Datos de actualización inválidos. Debe ser un objeto no vacío.",
      });
    }
    const updated = await updateUserById(id, updateData);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Usuario actualizado exitosamente.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }
  } catch (error) {
    console.error("Error en controlador updateById:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};

/**
 * Maneja la petición POST /users/del/byId
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @example
 * POST /users/del/byId
 * Content-Type: application/json
 * Authorization: Bearer <token_de_autenticacion>
 *
 * {
 *   "id": 1
 * }
 */
export const deleteById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || !Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID inválido. Debe ser un número entero positivo.",
      });
    }
    const deleted = await deleteUserById(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Usuario eliminado exitosamente.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }
  } catch (error) {
    console.error("Error en controlador deleteById:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};
