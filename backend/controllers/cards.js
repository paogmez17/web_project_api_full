const Card = require("../models/card");

// GET todas las tarjetas
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Crear tarjeta
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// Eliminar tarjeta
module.exports.deleteCard = (req, res) => {
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
        res.send({ message: "Tarjeta eliminada correctamente" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválida" });
      }
      const status = err.statusCode || 500;
      res.status(status).send({ message: err.message });
    });
};

// LIKE
module.exports.likeCard = (req, res) => {
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
    .catch((err) => res.status(500).send({ message: err.message }));
};

// DISLIKE
module.exports.dislikeCard = (req, res) => {
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
    .catch((err) => res.status(500).send({ message: err.message }));
};
