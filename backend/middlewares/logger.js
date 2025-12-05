const fs = require("fs");
const path = require("path");

// Ruta de la carpeta logs
const logsDir = path.join(__dirname, "../logs");

// Crear carpeta logs si no existe
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// ----- REQUEST LOGGER -----
const requestLogger = (req, res, next) => {
  const log = {
    method: req.method,
    url: req.url,
    time: new Date().toISOString(),
  };

  fs.appendFile(
    path.join(logsDir, "request.log"),
    JSON.stringify(log) + "\n",
    (err) => {
      if (err) console.error("Error writing request log:", err);
    }
  );

  next();
};

// ----- ERROR LOGGER -----
const errorLogger = (err, req, res, next) => {
  const log = {
    message: err.message,
    stack: err.stack,
    time: new Date().toISOString(),
  };

  fs.appendFile(
    path.join(logsDir, "error.log"),
    JSON.stringify(log) + "\n",
    () => {}
  );

  next(err);
};

module.exports = { requestLogger, errorLogger };
