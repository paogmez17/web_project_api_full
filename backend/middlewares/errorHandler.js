module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // Si es un error inesperado, devuelve 500
  res.status(statusCode).send({
    message: statusCode === 500 ? "Error interno del servidor" : message,
  });
};
