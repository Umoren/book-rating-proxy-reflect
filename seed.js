const mongoose = require("mongoose");
const bookData = require("./mockData");
const Mock = require("mockjs");
const Book = require("./modules/book/book.model");
const User = require("./modules/user/user.model");
const bcrypt = require("bcrypt");

// Replace these with your own MongoDB connection string and options
const MONGODB_URI = "mongodb://localhost:27017/bookratingapp";
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, MONGODB_OPTIONS)
  .then(async () => {
    console.log("Connected to MongoDB.");

    // Clear the existing data
    await Book.deleteMany();
    await User.deleteMany();

    // Generate seed data for users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const username = Mock.mock("@name");
      const password = await bcrypt.hash(Mock.mock("@word"), 10);
      users.push(new User({ username, password }));
    }

    // Save users to the database
    await User.insertMany(users);

    const books = [];
    bookData.map((bookInfo) => {
      const { title, description, author } = bookInfo;
      const ratings = [];

      // Generate random ratings from the seed users
      for (let j = 0; j < users.length; j++) {
        if (Math.random() > 0.7) {
          // 30% chance of a user rating the book
          const value = Mock.mock("@integer(1, 5)");
          ratings.push({ user: users[j]._id, value });
        }
      }

      books.push(new Book({ title, author, description, ratings }));
    });

    // Save books to the database
    await Book.insertMany(books);

    console.log("Seed data generated successfully.");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB.", err);
  });
