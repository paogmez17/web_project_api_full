// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");

const { login, createUser } = require("./controllers/users");
const usersRouter = require("./routers/users");
const cardsRouter = require("./routers/cards");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const {
  validateLogin,
  validateCreateUser,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/aroundb";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://34.121.100.25";

// ---------------- Middleware JSON ----------------
app.use(express.json());

// ---------------- CORS ----------------
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000", "http://localhost:30000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// ---------------- Logger de solicitudes ----------------
app.use(requestLogger);

// ---------------- Rutas públicas ----------------
app.post("/signup", validateCreateUser, createUser);
app.post("/signin", validateLogin, login);

// ---------------- Middleware global de autorización ----------------
app.use(auth);

// ---------------- Rutas protegidas ----------------
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// ---------------- Ruta no encontrada ----------------
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// ---------------- Logger de errores ----------------
app.use(errorLogger);

// ---------------- Manejo de errores de Celebrate ----------------
app.use(errors());

// ---------------- Manejo centralizado de errores ----------------
app.use(errorHandler);

// ---------------- Conexión a MongoDB ----------------
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  });
