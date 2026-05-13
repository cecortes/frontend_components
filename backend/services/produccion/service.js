import dbPool from "../../config/db.js";

/**
 * Obtiene todos los registros de producción de la base de datos.
 * @returns {Promise<Array>} Array de objetos de producción.
 */
export const getAllProduccion = async () => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM produccion");
    return rows;
  } catch (error) {
    console.error("Error obteniendo registros de producción:", error);
    throw new Error("Error al obtener registros de producción de la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Crea un nuevo registro de producción en la base de datos.
 * @param {string} sku - SKU del producto producido (requerido).
 * @param {string} product - Nombre del producto producido (requerido).
 * @param {string} date - Fecha de producción (requerido).
 * @param {string} usr - Usuario que registra la producción (requerido).
 * @returns {Promise<number>} ID del registro de producción creado.
 */
export const createNewProduccion = async (sku, product, date, usr) => {
  let connection;
  try {
    connection = await dbPool.getConnection();

    // Insertar nuevo registro de producción
    const [result] = await connection.execute(
      "INSERT INTO produccion (produccion_sku, produccion_product, produccion_date, produccion_usr) VALUES (?, ?, ?, ?)",
      [sku, product, date, usr],
    );

    return result.insertId;
  } catch (error) {
    console.error("Error creando registro de producción:", error);
    throw new Error(
      "Error en el servidor durante la creación del registro de producción.",
    );
  } finally {
    if (connection) connection.release();
  }
};
