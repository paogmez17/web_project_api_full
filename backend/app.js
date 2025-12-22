require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routers/users");
const cardsRouter = require("./routers/cards");
const { createUser, login } = require("./routers/auth");

const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = 3000;
const MONGO_URL = "mongodb://127.0.0.1:27017/aroundb";

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

// RUTAS PÚBLICAS
app.post("/signin", login);
app.post("/signup", createUser);

//  AUTORIZACIÓN (todo lo que viene después)
app.use(auth);

// RUTAS PROTEGIDAS
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// ERRORES
app.use(errorLogger);
app.use(errorHandler);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch(console.error);
