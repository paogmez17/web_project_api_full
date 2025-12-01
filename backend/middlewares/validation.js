const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// Validación personalizada para URL
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Validación para crear usuario
const validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// Validación para login
const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Validación de actualización de perfil
const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

// Validación de avatar
const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

// Validación de creación de tarjeta
const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

// Validación de ID por params
const validateId = celebrate({
  [Segments.PARAMS]: Joi.object()
    .keys({
      cardId: Joi.string().hex().length(24),
      userId: Joi.string().hex().length(24),
    })
    .unknown(true),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCreateCard,
  validateId,
};
