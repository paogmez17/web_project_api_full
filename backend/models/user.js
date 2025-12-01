const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Jacques Cousteau",
    },

    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Explorer",
    },

    avatar: {
      type: String,
      default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.png",
      validate: {
        validator: (v) => validator.isURL(v),
        message: "El avatar debe ser una URL válida",
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Email no válido",
      },
    },

    // NO DEVOLVER LA CONTRASEÑA POR DEFECTO
    password: {
      type: String,
      required: true,
      select: false, //
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
