const express = require("express");
const router = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const { validateCreateCard, validateId } = require("../middlewares/validation");

// obtener todas las tarjetas
router.get("/", getCards);

// crear tarjeta
router.post("/", validateCreateCard, createCard);

// eliminar tarjeta
router.delete("/:cardId", validateId, deleteCard);

// like
router.put("/:cardId/likes", validateId, likeCard);

// dislike
router.delete("/:cardId/likes", validateId, dislikeCard);

module.exports = router;
