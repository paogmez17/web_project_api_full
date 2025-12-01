const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "mi_secreto_para_sprint";

// ------------------ Crear usuario ------------------
const createUser = async (req, res) => {
  try {
    const {
      name = "Jacques Cousteau",
      about = "Explorador",
      avatar = "https://i.pravatar.cc/150?img=3",
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son obligatorios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ _id: newUser._id, email: newUser.email });
  } catch (err) {
    console.error("Error en createUser:", err);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

// ------------------ Login ------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email o contraseña incorrectos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

// ------------------ Obtener todos los usuarios ------------------
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id name about avatar email");
    res.json(users);
  } catch (err) {
    console.error("Error en getUsers:", err);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// ------------------ Obtener usuario por ID ------------------
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, "_id name about avatar email");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error en getUserById:", err);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

// ------------------ Obtener datos del usuario actual ------------------
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId, "_id name about avatar email");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error en getCurrentUser:", err);
    res.status(500).json({ message: "Error al obtener datos del usuario" });
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  getCurrentUser,
};
