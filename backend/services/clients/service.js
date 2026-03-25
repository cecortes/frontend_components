import dbPool from "../../config/db.js";

/**
 * Obtiene todos los clientes de la base de datos.
 * @returns {Promise<Array>} Array de objetos cliente con campos clients_id, clients_name, clients_mail, clients_user, clients_role.
 */
export const getAllClients = async () => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const [rows] = await connection.execute(
      "SELECT clients_id, clients_name, clients_mail, clients_phone, clients_rfc, clients_dir AS clients_address, clients_contact FROM clients",
    );
    return rows;
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    throw new Error("Error al obtener clientes de la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Crea un nuevo cliente en la base de datos.
 * @param {string} name - Nombre del cliente (requerido).
 * @param {string} mail - Email del cliente (requerido).
 * @param {string} [phone] - Teléfono del cliente (opcional).
 * @param {string} [rfc] - RFC del cliente (opcional).
 * @param {string} [address] - Dirección del cliente (opcional).
 * @param {string} [contact] - Contacto del cliente (opcional).
 * @returns {Promise<number>} ID del cliente creado.
 * @throws {Error} 'Cliente ya existe' si el nombre o email está duplicado.
 */
export const createNewClient = async (
  name,
  mail,
  phone,
  rfc,
  address,
  contact,
) => {
  let connection;
  try {
    connection = await dbPool.getConnection();

    // Verificar unicidad por nombre o email
    const [existing] = await connection.execute(
      "SELECT clients_id FROM clients WHERE clients_name = ? OR clients_mail = ?",
      [name, mail],
    );
    if (existing.length > 0) {
      throw new Error("Cliente ya existe");
    }

    // Insertar nuevo cliente
    const [result] = await connection.execute(
      "INSERT INTO clients (clients_name, clients_mail, clients_phone, clients_rfc, clients_dir, clients_contact) VALUES (?, ?, ?, ?, ?, ?)",
      [
        name,
        mail,
        phone || null,
        rfc || null,
        address || null,
        contact || null,
      ],
    );

    return result.insertId;
  } catch (error) {
    if (error.message === "Cliente ya existe") {
      throw error;
    }
    console.error("Error creando cliente:", error);
    throw new Error("Error en el servidor durante la creación del cliente.");
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Obtiene un cliente por ID de la base de datos.
 * @param {number} id - El ID del cliente.
 * @returns {Promise<Object|null>} Objeto cliente o null si no encontrado.
 */
export const getClientById = async (id) => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM clients WHERE clients_id = ?",
      [id],
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error obteniendo cliente por ID:", error);
    throw new Error("Error al obtener cliente de la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};

// Mapeo de campos API a columnas DB para clientes
const fieldMapping = {
  name: "clients_name",
  mail: "clients_mail",
  phone: "clients_phone",
  rfc: "clients_rfc",
  address: "clients_dir",
  contact: "clients_contact",
};

/**
 * @function updateClientById
 * @description
 * Actualiza un cliente específico en la base de datos por su ID.
 *
 * @param {number} id - El ID del cliente a actualizar.
 * @param {object} updateData - Objeto con los campos a actualizar.
 * @returns {boolean} true si se actualizó, false si no.
 *
 * @throws {Error} Si ocurre un error en la consulta.
 * @example
 * // returns true
 * updateClientById(1, { name: 'Nuevo Nombre' });
 */
export const updateClientById = async (id, updateData) => {
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

    const query = `UPDATE clients SET ${fields.join(
      ", ",
    )} WHERE clients_id = ?`;
    values.push(id);

    const [result] = await connection.execute(query, values);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error en updateClientById:", error);
    return false;
  } finally {
    if (connection) connection.release();
  }
};

/**
 * Elimina un cliente por ID en la base de datos.
 * @param {number} id - El ID del cliente.
 * @returns {Promise<boolean>} true si eliminado, false si no encontrado.
 */
export const deleteClientById = async (id) => {
  let connection;
  try {
    connection = await dbPool.getConnection();
    const query = `DELETE FROM clients WHERE clients_id = ?`;
    const [result] = await connection.execute(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error eliminando cliente por ID:", error);
    throw new Error("Error al eliminar cliente en la base de datos.");
  } finally {
    if (connection) connection.release();
  }
};
