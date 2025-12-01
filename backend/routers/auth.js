const express = require("express");
const router = express.Router();

const { createUser, login } = require("../controllers/auth");

const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");

// registro
router.post("/signup", validateCreateUser, createUser);

// login
router.post("/signin", validateLogin, login);

module.exports = router;
