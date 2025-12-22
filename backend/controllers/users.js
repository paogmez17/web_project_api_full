const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "mi_secreto_para_sprint"; // tu clave secreta

// -------------------- GET USERS --------------------
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Error del servidor" }));
};

// -------------------- GET CURRENT USER --------------------
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: "Error del servidor" }));
};

// -------------------- GET USER BY ID --------------------
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(() => res.status(404).send({ message: "Usuario no encontrado" }));
};

// -------------------- UPDATE PROFILE --------------------
const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({ message: "Datos inválidos" }));
};

// -------------------- UPDATE AVATAR --------------------
const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({ message: "Avatar inválido" }));
};

// -------------------- REGISTER --------------------
const register = (req, res) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ email, password: hash });
    })
    .then((user) => {
      res
        .status(201)
        .send({
          message: "Usuario creado",
          user: { email: user.email, _id: user._id },
        });
    })
    .catch(() => res.status(500).send({ message: "Error creando usuario" }));
};

// -------------------- LOGIN --------------------
const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ message: "Usuario o contraseña incorrecta" });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(401)
            .send({ message: "Usuario o contraseña incorrecta" });
        }

        // Generar token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({ token, user: { email: user.email, _id: user._id } });
      });
    })
    .catch(() => res.status(500).send({ message: "Error del servidor" }));
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  register,
  login,
};
