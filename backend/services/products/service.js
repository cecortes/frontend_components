import dbPool from "../../config/db.js";

/**
 * Obtiene todos los productos de la base de datos.
 * @returns {Promise<Array>} Array de objetos producto.
 */
export const getAllProducts = async () => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM products");
    return rows;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw new Error("Error al obtener productos de la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Obtiene un producto por ID de la base de datos.
 * @param {number} id - El ID del producto.
 * @returns {Promise<Object|null>} Objeto producto o null si no encontrado.
 */
export const getProductById = async (id) => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM products WHERE products_id = ?",
      [id],
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error obteniendo producto por ID:", error);
    throw new Error("Error al obtener producto de la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Crea un nuevo producto en la base de datos.
 * @param {string} sku - Clave interna del producto (requerido).
 * @param {string} name - Nombre del producto (requerido).
 * @param {string} description - Descripción del producto.
 * @returns {Promise<number>} ID del producto creado.
 * @throws {Error} 'Producto ya existe' si el nombre está duplicado.
 */
export const createNewProduct = async (sku, name, description) => {
  let connection;
  try {
    connection = await dbPool.getConnection();

    // Verificar unicidad por nombre
    const [existing] = await connection.execute(
      "SELECT products_id FROM products WHERE products_name = ?",
      [name],
    );
    if (existing.length > 0) {
      throw new Error("Producto ya existe");
    }

    // Insertar nuevo producto
    const [result] = await connection.execute(
      "INSERT INTO products (products_sku, products_name, products_desc) VALUES (?, ?, ?)",
      [sku, name, description || null],
    );

    return result.insertId;
  } catch (error) {
    if (error.message === "Producto ya existe") {
      throw error;
    }
    console.error("Error creando producto:", error);
    throw new Error("Error en el servidor durante la creación del producto.");
  } finally {
    if (connection) connection.release();
  }
};

// Mapeo de campos API a columnas DB para productos
const fieldMapping = {
  sku: "products_sku",
  name: "products_name",
  description: "products_desc",
};

/**
 * Actualiza un producto por ID en la base de datos.
 * @param {number} id - El ID del producto.
 * @param {Object} updateData - Objeto con los campos a actualizar.
 * @returns {Promise<boolean>} true si actualizado, false si no encontrado.
 */
export const updateProductById = async (id, updateData) => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const fields = [];
    const values = [];

    // Filtrar y mapear campos válidos
    for (const [key, value] of Object.entries(updateData)) {
      if (fieldMapping[key] !== undefined) {
        fields.push(`${fieldMapping[key]} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      return false; // No hay campos válidos para actualizar
    }

    const query = `UPDATE products SET ${fields.join(
      ", ",
    )} WHERE products_id = ?`;
    values.push(id);

    const [result] = await connection.execute(query, values);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error actualizando producto por ID:", error);
    throw new Error("Error al actualizar producto en la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Elimina un producto por ID en la base de datos.
 * @param {number} id - El ID del producto.
 * @returns {Promise<boolean>} true si eliminado, false si no encontrado.
 */
export const deleteProductById = async (id) => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const query = `DELETE FROM products WHERE products_id = ?`;
    const [result] = await connection.execute(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error eliminando producto por ID:", error);
    throw new Error("Error al eliminar producto en la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};
