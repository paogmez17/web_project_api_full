const expressWinston = require("express-winston");
const { transports, format } = require("winston");

// Logueo de todas las solicitudes
const requestLogger = expressWinston.logger({
  transports: [new transports.File({ filename: "request.log" })],
  format: format.json(),
});

// Logueo de errores
const errorLogger = expressWinston.errorLogger({
  transports: [new transports.File({ filename: "error.log" })],
  format: format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
