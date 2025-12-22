const Card = require("../models/card");

// ---------------- GET todas las tarjetas ----------------
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) =>
      res.status(500).send({ message: "Error al obtener las tarjetas" })
    );
};

// ---------------- Crear tarjeta ----------------
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) =>
      res.status(400).send({ message: "Error al crear la tarjeta" })
    );
};

// ---------------- Eliminar tarjeta ----------------
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        return res.status(403).send({
          message: "No tienes permiso para eliminar esta tarjeta",
        });
      }

      return Card.findByIdAndDelete(cardId).then(() =>
        res.send({ message: "Tarjeta eliminada" })
      );
    })
    .catch((err) => {
      const status = err.statusCode || 500;
      res.status(status).send({ message: err.message });
    });
};

// ---------------- LIKE ----------------
const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch(() =>
      res.status(500).send({ message: "Error al dar like a la tarjeta" })
    );
};

// ---------------- DISLIKE ----------------
const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch(() =>
      res.status(500).send({ message: "Error al quitar like a la tarjeta" })
    );
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
