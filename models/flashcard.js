const mongoose = require("mongoose");
const Joi = require("joi");

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true, minlength: 2, maxlength: 255 },
  option: { type: ["", "", ""], required: true, minlength: 2, maxlength: 50 },
  answer: { type: String, required: true },
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

function validateFlashcard(flashcard) {
  const schema = Joi.object({
    question: Joi.string().min(2).max(255).required(),
    option: Joi.array.length.required(),
    answer: Joi.string().required(),
  });
  return schema.validate(flashcard);
}
exports.Flashcard = Flashcard;
exports.validate = validateFlashcard;
exports.flashcardSchema = flashcardSchema;

module.exports = Flashcard;
