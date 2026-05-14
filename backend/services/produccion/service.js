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

/**
 * Obtiene el conteo de registros de producción de un producto en un periodo determinado.
 * Garantiza retornar todos los días del periodo, asignando 0 a aquellos sin registros en la DB.
 * @param {string} sku - SKU del producto
 * @param {string} startDate - Fecha inicial del periodo (ej: '2023-10-01 00:00:00')
 * @param {string} endDate - Fecha final del periodo (ej: '2023-10-07 23:59:59')
 * @returns {Promise<Array>} Array de objetos con el conteo por fecha [{fecha: 'YYYY-MM-DD', total: 5}, ...]
 */
export const getProduccionByPeriodProduct = async (sku, startDate, endDate) => {
  let connection;
  try {
    connection = await dbPool.getConnection();

    // Extraemos solo la fecha (YYYY-MM-DD) de los parámetros
    const start = new Date(startDate.replace(' ', 'T'));
    const end = new Date(endDate.replace(' ', 'T'));

    const [rows] = await connection.execute(
      `SELECT DATE(produccion_date) as fecha, COUNT(*) as total 
       FROM produccion 
       WHERE produccion_sku = ? 
         AND produccion_date >= ? 
         AND produccion_date <= ? 
       GROUP BY DATE(produccion_date) 
       ORDER BY fecha ASC`,
      [sku, startDate, endDate]
    );

    // Mapear los resultados de SQL (que vienen solo para días con >= 1 produccion)
    const dbResultsMap = {};
    rows.forEach(row => {
      let dateString;
      if (row.fecha instanceof Date) {
        const yyyy = row.fecha.getFullYear();
        const mm = String(row.fecha.getMonth() + 1).padStart(2, '0');
        const dd = String(row.fecha.getDate()).padStart(2, '0');
        dateString = `${yyyy}-${mm}-${dd}`;
      } else {
        dateString = String(row.fecha).substring(0, 10);
      }
      dbResultsMap[dateString] = parseInt(row.total, 10);
    });

    // Generar el array con el conteo para TODOS los días en el rango
    const responseArray = [];
    let currentDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const lastDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    while (currentDate <= lastDate) {
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dd = String(currentDate.getDate()).padStart(2, '0');
      const dateString = `${yyyy}-${mm}-${dd}`;
      
      responseArray.push({
        fecha: dateString,
        total: dbResultsMap[dateString] || 0
      });
      
      // Avanzar un día
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return responseArray;
  } catch (error) {
    console.error("Error obteniendo registros de producción por periodo y producto:", error);
    throw new Error("Error al obtener registros de producción de la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};
