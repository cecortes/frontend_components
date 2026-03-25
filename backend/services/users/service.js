import dbPool from "../../config/db.js";

/**
 * Obtiene todos los usuarios de la base de datos.
 * @returns {Promise<Array>} Array de objetos usuario con campos users_id, users_name, users_mail, users_user, users_role.
 */
export const getAllUsers = async () => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const [rows] = await connection.execute(
      "SELECT users_id, users_name, users_mail, users_user, users_role FROM users",
    );
    return rows;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw new Error("Error al obtener usuarios de la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Obtiene un usuario por ID de la base de datos.
 * @param {number} id - El ID del usuario.
 * @returns {Promise<Object|null>} Objeto usuario o null si no encontrado.
 */
export const getUserById = async (id) => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE users_id = ?",
      [id],
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error obteniendo usuario por ID:", error);
    throw new Error("Error al obtener usuario de la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Actualiza un usuario por ID en la base de datos.
 * @param {number} id - El ID del usuario.
 * @param {Object} updateData - Objeto con los campos a actualizar (usa nombres API: name, mail, user, role).
 * @returns {Promise<boolean>} true si actualizado, false si no encontrado.
 */
export const updateUserById = async (id, updateData) => {
  let connection;
  try {
    connection = await dbPool.getConnection();

    // Mapeo de campos API a nombres de columna DB
    const fieldMapping = {
      name: "users_name",
      mail: "users_mail",
      user: "users_user",
      role: "users_role",
    };

    // Filtrar y mapear solo campos válidos
    const validFields = Object.keys(updateData).filter(
      (key) => fieldMapping[key],
    );
    if (validFields.length === 0) {
      throw new Error("No se proporcionaron campos válidos para actualizar.");
    }

    const dbFields = validFields.map((key) => fieldMapping[key]);
    const values = validFields.map((key) => updateData[key]);

    const setClause = dbFields.map((field) => `${field} = ?`).join(", ");
    const query = `UPDATE users SET ${setClause} WHERE users_id = ?`;
    const [result] = await connection.execute(query, [...values, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error actualizando usuario por ID:", error);
    // Para asegurar que retorne false en casos de error, tratando como no actualizado
    return false;
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Elimina un usuario por ID en la base de datos.
 * @param {number} id - El ID del usuario.
 * @returns {Promise<boolean>} true si eliminado, false si no encontrado.
 */
export const deleteUserById = async (id) => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const query = `DELETE FROM users WHERE users_id = ?`;
    const [result] = await connection.execute(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error eliminando usuario por ID:", error);
    throw new Error("Error al eliminar usuario en la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};
