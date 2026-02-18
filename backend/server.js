// 1. Dependencias
import express from "express";
import cors from "cors";

// Importar rutas
import rutas from "./routes/rutas.js";

// 2. Configuración de la App
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middlewares
app.use(cors()); // Permitir peticiones del frontend
app.use(express.json()); // Parsear body como JSON

// 4. Rutas
// Montar el enrutador principal bajo el path base de la API
app.use("/api/waresmart", rutas);

// 5. Manejo de Errores

// Manejador para 404 (Not Found) - Debe ir después de las rutas
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Manejador de errores genérico (500) - Debe ir al final
app.use((err, req, res, next) => {
  console.error(err.stack); // Log del error en consola
  res
    .status(500)
    .json({ message: "Error interno del servidor", error: err.message });
});

// 6. Inicio del Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
