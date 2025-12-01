const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getUsers,
  getUserById,
  getCurrentUser,
} = require("../controllers/users");

const { validateId } = require("../middlewares/validation");

// Rutas protegidas
router.get("/", auth, getUsers);
router.get("/me", auth, getCurrentUser);
router.get("/:userId", auth, validateId, getUserById);

module.exports = router;
