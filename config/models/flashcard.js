const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true, minlength: 2, maxlength: 255 },
  option: { type: ['', '', ''], required: true, minlength: 2, maxlength: 50 },
  answer: { type: String, required: true },

});


const Flashcard = mongoose.model('Flashcard', productSchema);

module.exports = Flashcard;
