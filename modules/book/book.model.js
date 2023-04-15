const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  value: { type: Number, required: true, min: 1, max: 5 },
});

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: false },
    ratings: [ratingSchema],
  },
  {
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("Book", bookSchema);
