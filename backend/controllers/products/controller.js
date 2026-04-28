import {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
} from "../../services/products/service.js";

/**
 * Maneja la petición POST /products/get/all
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const getAll = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({
      success: true,
      data: products,
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
 * Maneja la petición POST /products/get/byId
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
    const product = await getProductById(id);
    if (product) {
      res.status(200).json({
        success: true,
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Producto no encontrado.",
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
 * Maneja la petición POST /products/new
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
export const createNew = async (req, res) => {
  const { sku, name, description } = req.body;

  // Validación básica
  if (!name || typeof name !== "string" || name.length < 2) {
    return res.status(400).json({
      success: false,
      message:
        "Nombre es requerido y debe ser una cadena de al menos 2 caracteres.",
    });
  }

  try {
    const productId = await createNewProduct(sku, name, description);
    res.status(201).json({
      success: true,
      message: "Producto creado exitosamente.",
      productId: productId,
    });
  } catch (error) {
    if (error.message === "Producto ya existe") {
      return res.status(409).json({
        success: false,
        message: "El producto ya existe.",
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
 * Maneja la petición POST /products/upd/byId
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
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
    const updated = await updateProductById(id, updateData);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Producto actualizado exitosamente.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Producto no encontrado.",
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
 * Maneja la petición POST /products/del/byId
 * @param {Object} req - Objeto de petición Express.
 * @param {Object} res - Objeto de respuesta Express.
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
    const deleted = await deleteProductById(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Producto eliminado exitosamente.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Producto no encontrado.",
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
