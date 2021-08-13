const { Flashcard, validateFlashcard, flashcardSchema } = require("../models/flashcard");
const express = require("express");
const router = express.Router();
const { Deck, validateDeck } = require("../models/deck") 

// deck routes

router.get('/', async (req, res) => {
  try {
    const decks = await Deck.find();
    return res.send(decks);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`); 

  }
});




router.get("/:deckid", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.deckid);

    if (!deck)
      return res.status(400).send(`The deck with id "${req.params.deckid}" 
      does not exist.`);

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});





router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const deck = new Deck({
      title: req.body.title,
      cards: req.body.cards,
    });

    await deck.save();

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:deckid", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const deck = await Deck.findByIdAndUpdate(
      req.params.deckid,
      {
        title: req.body.title,
        cards: req.body.cards,
      },
      { new: true }
    );
    if (!deck)
      return res.status(400).send(`The deck with id "${req.params.id}" 
      does not exist.`);

    await deck.save();

    return res.send(deck);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});




router.delete("/:deckid", async (req, res) => {
  try {

    const deck = await Deck.findByIdAndRemove(req.params.deckid);
    
    if (!deck)
      return res.status(400).send(`The deck with id "${req.params.deckid}" 
      does not exist.`);

    return res.send(deck);

  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});









// flashcard routes

router.get('/', async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    return res.send(flashcards);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`); 

  }
});





router.get('/:deckid/cards', async (req, res) => {
  try {
    const decks = await Deck.find();
    return res.send(decks);
  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`); 

  }
});






router.post("/:deckid/cards", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const flashcard = new Flashcard({
      question: req.body.question,
      answer: req.body.answer,
    });

    await flashcard.save();

    return res.send(flashcard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.put("/:deckid/cards/:cardid", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const flashcard = await Flashcard.findByIdAndUpdate(
      req.params.cardid,
      {
        question: req.body.question,
        answer: req.body.answer,
      },
      { new: true }
    );
    if (!flashcard)
      return res.status(400).send(`The flashcard with id "${req.params.cardid}" 
      does not exist.`);

    await flashcard.save();

    return res.send(flashcard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.delete("/:deckid/cards/:cardid", async (req, res) => {
  try {

    const flashcard = await Flashcard.findByIdAndRemove(req.params.cardid);
    
    if (!flashcard)
      return res.status(400).send(`The flashcard with id "${req.params.cardid}" 
      does not exist.`);

    return res.send(deck);

  } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});





module.exports = router;
