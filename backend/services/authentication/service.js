// Importar dependencias
import dbPool from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * Intenta autenticar a un usuario y devuelve un token JWT si tiene éxito.
 * 
 * 
// Nota: Al usar 'export const', no se usa 'export default' ni 'module.exports'.
 */
export const loginUser = async (username, password) => {
  let connection;
  try {
    // 1. Obtener conexión del Pool
    connection = await dbPool.getConnection();

    // 2. Buscar al usuario por su username
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE users_user = ?",
      [username],
    );

    // 3. Si no se encuentra el usuario, lanzar un error de credenciales
    if (rows.length === 0) {
      // Usamos un mensaje genérico por seguridad
      throw new Error("Credenciales incorrectas");
    }

    const user = rows[0];

    // 4. Comparar la contraseña enviada con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, user.users_hash);

    // 5. Si la contraseña no coincide, lanzar el mismo error
    if (!isPasswordValid) {
      throw new Error("Credenciales incorrectas");
    }

    // 6. ¡Éxito! Crear el Payload del JWT
    // NUNCA incluyas la contraseña o datos sensibles en el payload
    const payload = {
      userId: user.users_id,
      username: user.users_user,
      role: user.users_role, // Muy útil para la autorización en el frontend/backend
    };

    // 7. Firmar y devolver el token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30m" }, // El token expira en 30 min
    );

    // 8. username, role
    const usuario = user.users_user;
    const role = user.users_role;

    return [token, usuario, role];
  } catch (error) {
    // Si el error es el que lanzamos (Credenciales), lo volvemos a lanzar
    // para que el controlador lo atrape como un error 401.
    if (error.message === "Credenciales incorrectas") {
      throw error;
    }
    // Si es otro error (ej. DB caída), lanzamos un error genérico
    console.error("Error en el servicio de login:", error);
    throw new Error("Error en el servidor durante la autenticación.");
  } finally {
    // 8. Siempre liberar la conexión
    if (connection) connection.release();
  }
};

/**
 * registerUser
 * @async
 * @description: Registra un nuevo usuario en la base de datos.
 * @param {string} username - Nombre de usuario único.
 * @param {string} password - Contraseña en texto plano (se hashea).
 * @param {string} [role='user'] - Rol del usuario (opcional, default 'user').
 * @returns {number} ID del usuario creado.
 * @throws {Error} 'Usuario ya existe' si el username está duplicado, o errores genéricos.
 */
export const registerUser = async (
  user,
  mail,
  name,
  password,
  role = "user",
) => {
  let connection;

  try {
    connection = await dbPool.getConnection();

    // Verificar si el username ya existe
    const [existing] = await connection.execute(
      "SELECT users_id FROM users WHERE users_user = ?",
      [user],
    );
    if (existing.length > 0) {
      throw new Error("Usuario ya existe");
    }

    // Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const [result] = await connection.execute(
      "INSERT INTO users (users_name, users_mail, users_user, users_hash, users_role) VALUES (?, ?, ?, ?, ?)",
      [name, mail, user, hashedPassword, role],
    );

    return result.users_id;
  } catch (error) {
    if (error.message === "Usuario ya existe") {
      throw error;
    }
    console.error("Error en el servicio de registro:", error);
    throw new Error("Error en el servidor durante el registro.");
  } finally {
    if (connection) connection.release();
  }
};
