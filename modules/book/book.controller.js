const Book = require("./book.model");

// Fetch the list of books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("ratings.user", "username");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books.", error });
  }
};

// Rate book handler
const rateBookHandler = {
  apply: async function (target, thisArg, argumentsList) {
    const [userId, bookId, value] = argumentsList;

    if (!userId) {
      throw new Error("User must be logged in to rate a book.");
    }

    if (value < 1 || value > 5) {
      throw new Error("Rating value must be between 1 and 5.");
    }

    return target.apply(thisArg, argumentsList);
  },
};

const rateBookFunction = async (userId, bookId, value) => {
  // Check if the book exists
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error("Book not found.");
  }

  // Check if the user has already rated the book
  const existingRating = book.ratings.find(
    (rating) => rating.user.toString() === userId
  );
  if (existingRating) {
    throw new Error("You have already rated this book.");
  }

  // Add the new rating to the book
  book.ratings.push({ user: userId, value });
  await book.save();

  return book;
};

const rateBookProxy = new Proxy(rateBookFunction, rateBookHandler);

// Add a rating to a book
exports.rateBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.bookId;
    const value = req.body.value;

    const book = await rateBookProxy(userId, bookId, value);

    res.status(201).json({ message: "Book rating added successfully.", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error rating book.", error: error.message });
  }
};
