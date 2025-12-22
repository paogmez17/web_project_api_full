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

router.get("/", getCards);
router.post("/", validateCreateCard, createCard);
router.delete("/:cardId", validateId, deleteCard);
router.put("/:cardId/likes", validateId, likeCard);
router.delete("/:cardId/likes", validateId, dislikeCard);

module.exports = router;
