const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");

const { login, createUser } = require("./controllers/users");

const usersRouter = require("./routers/users");
const cardsRouter = require("./routers/cards");

const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler"); // Manejo centralizado
const {
  validateLogin,
  validateCreateUser,
} = require("./middlewares/validation"); // Validación celebrate

const { requestLogger, errorLogger } = require("./middlewares/logger"); // Logging

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------- Middleware JSON ----------------
app.use(express.json());

// ---------------- Logger de solicitudes (PASO 3) ----------------
app.use(requestLogger);

// ---------------- Rutas públicas (sin token) ----------------
app.post("/signup", validateCreateUser, createUser);
app.post("/signin", validateLogin, login);

// ---------------- Middleware global de autorización ----------------
// Todas las rutas siguientes requieren token
app.use(auth);

// ---------------- Rutas protegidas ----------------
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// ---------------- Ruta no encontrada ----------------
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// ---------------- Logger de errores (PASO 3) ----------------
app.use(errorLogger);

// ---------------- Errores de Celebrate ----------------
app.use(errors());

// ---------------- Manejo centralizado de errores ----------------
app.use(errorHandler);

// ---------------- Conexión a MongoDB ----------------
mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  });
