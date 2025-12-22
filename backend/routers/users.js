const router = require("express").Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

const {
  validateUpdateProfile,
  validateUpdateAvatar,
  validateId,
} = require("../middlewares/validation");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:userId", validateId, getUserById);

router.patch("/me", validateUpdateProfile, updateProfile);
router.patch("/me/avatar", validateUpdateAvatar, updateAvatar);

module.exports = router;
