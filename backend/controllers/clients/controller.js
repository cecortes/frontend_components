import {
  getAllClients,
  createNewClient,
  getClientById,
  updateClientById,
  deleteClientById,
} from "../../services/clients/service.js";

/**
 * Maneja la petición POST /clients/get/all
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 *
 * Ejemplo de respuesta exitosa (status 200):
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "clients_id": 1,
 *       "clients_name": "Juan Pérez",
 *       "clients_mail": "juan@example.com",
 *       "clients_user": "juanp",
 *       "clients_role": "admin"
 *     },
 *     {
 *       "clients_id": 2,
 *       "clients_name": "María García",
 *       "clients_mail": "maria@example.com",
 *       "clients_user": "mariag",
 *       "clients_role": "user"
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
    const clients = await getAllClients();
    res.status(200).json({
      success: true,
      data: clients,
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
 * Maneja la petición POST /clients/new
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 *
 * Ejemplo de petición:
 * POST /clients/new
 * Content-Type: application/json
 * Authorization: Bearer <token>
 *
 * {
 *   "name": "Juan Pérez",
 *   "mail": "juan@example.com",
 *   "phone": "555-1234",
 *   "rfc": "JUAP123456",
 *   "address": "Calle Falsa 123",
 *   "contact": "María López"
 * }
 *
 * Ejemplo de respuesta exitosa (status 201):
 * {
 *   "success": true,
 *   "message": "Cliente creado exitosamente.",
 *   "clientId": 1
 * }
 *
 * Ejemplo de respuesta de error (status 409):
 * {
 *   "success": false,
 *   "message": "El cliente ya existe."
 * }
 */
export const createNew = async (req, res) => {
  const { name, mail, phone, rfc, address, contact } = req.body;

  // Validación básica
  if (!name || !mail) {
    return res.status(400).json({
      success: false,
      message: "Nombre y email son requeridos.",
    });
  }
  if (typeof name !== "string" || name.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Nombre debe ser una cadena de al menos 2 caracteres.",
    });
  }
  if (typeof mail !== "string" || !mail.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Email debe ser una dirección válida.",
    });
  }

  try {
    const clientId = await createNewClient(
      name,
      mail,
      phone,
      rfc,
      address,
      contact,
    );
    res.status(201).json({
      success: true,
      message: "Cliente creado exitosamente.",
      clientId: clientId,
    });
  } catch (error) {
    if (error.message === "Cliente ya existe") {
      return res.status(409).json({
        success: false,
        message: "El cliente ya existe.",
      });
    }
    console.error("Error en controlador createNew:", error.message);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};

/**
 * Maneja la petición POST /clients/get/byId
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
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
    const client = await getClientById(id);
    if (client) {
      res.status(200).json({
        success: true,
        data: client,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Cliente no encontrado.",
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
 * @function updateById
 * @description
 * Controlador para actualizar un cliente por ID.
 *
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @returns {void}
 *
 * @throws {Error} Si ocurre un error interno.
 * @example
 * // Responde con success: true o false
 * updateById(req, res);
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
    const updated = await updateClientById(id, updateData);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Cliente actualizado exitosamente.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Cliente no encontrado.",
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
 * Maneja la petición POST /clients/del/byId
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @example
 * POST /clients/del/byId
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
    const deleted = await deleteClientById(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Cliente eliminado exitosamente.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Cliente no encontrado.",
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
