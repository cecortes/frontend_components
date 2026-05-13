import { createNewProduccion, getAllProduccion } from "../../services/produccion/service.js";

/**
 * Maneja la petición POST /produccion/get/all
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const getAll = async (req, res) => {
  try {
    const produccionRecords = await getAllProduccion();
    res.status(200).json({
      success: true,
      data: produccionRecords,
    });
  } catch (error) {
    console.error("Error en controlador getAll (Produccion):", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};

/**
 * Maneja la petición POST /produccion/new
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const createNew = async (req, res) => {
  const { produccion_sku, produccion_product, produccion_date, produccion_usr } = req.body;

  // Validación de campos requeridos y tipos básicos
  if (!produccion_sku || typeof produccion_sku !== "string") {
    return res.status(400).json({
      success: false,
      message: "produccion_sku es requerido y debe ser una cadena de texto.",
    });
  }
  
  if (!produccion_product || typeof produccion_product !== "string") {
    return res.status(400).json({
      success: false,
      message: "produccion_product es requerido y debe ser una cadena de texto.",
    });
  }

  if (!produccion_usr || typeof produccion_usr !== "string") {
    return res.status(400).json({
      success: false,
      message: "produccion_usr es requerido y debe ser una cadena de texto.",
    });
  }

  // Validación del formato de fecha (yyyy-mm-dd 00:00:00) para MySQL datetime
  const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!produccion_date || typeof produccion_date !== "string" || !dateRegex.test(produccion_date)) {
    return res.status(400).json({
      success: false,
      message: "produccion_date es requerido y debe tener un formato válido (yyyy-mm-dd 00:00:00).",
    });
  }
  
  // Validar si la fecha es realmente válida (ej: no 2024-13-45)
  const parsedDate = new Date(produccion_date.replace(' ', 'T'));
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "produccion_date contiene una fecha u hora inválida.",
    });
  }

  try {
    const produccionId = await createNewProduccion(
      produccion_sku,
      produccion_product,
      produccion_date,
      produccion_usr
    );
    res.status(201).json({
      success: true,
      message: "Registro de producción creado exitosamente.",
      produccionId: produccionId,
    });
  } catch (error) {
    console.error("Error en controlador createNew (Produccion):", error.message);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};
