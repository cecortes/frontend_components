// Importar librerías
import mysql from "mysql2/promise";
import "dotenv/config";

// --- Configuración de la Base de Datos ---
// Creamos el Pool de conexiones una sola vez y lo exportamos.
// Cualquier servicio que necesite hablar con la DB importará este pool.
const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificación simple para saber si la conexión es exitosa al arrancar
dbPool
  .getConnection()
  .then((connection) => {
    console.log("Conexión a la base de datos MySQL establecida con éxito.");
    connection.release();
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });

export default dbPool;
