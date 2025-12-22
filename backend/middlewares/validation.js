const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// ------------------ Validación personalizada para URL ------------------
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// ------------------ Crear usuario ------------------
const validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// ------------------ Login ------------------
const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// ------------------ Actualizar perfil ------------------
const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

// ------------------ Actualizar avatar ------------------
const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

// ------------------ Crear tarjeta ------------------
const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateURL),
  }),
});

// ------------------ Validar IDs ------------------
const validateId = celebrate({
  [Segments.PARAMS]: Joi.object()
    .keys({
      userId: Joi.string().hex().length(24),
      cardId: Joi.string().hex().length(24),
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
