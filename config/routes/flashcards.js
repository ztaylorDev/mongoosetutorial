const Flashcard = require("../models/flashcard");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const flashcard = new flashcard({
      question: req.body.question,
      option: req.body.option,
      answer: req.body.answer,
    });
    await flashcard.save();
    
    return res.send(flashcard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
