const express = require("express");
const bookController = require("./book.controller");
const authenticateJWT = require("../../authenticateJWT");

const router = express.Router();

router.get("/", bookController.getBooks);
router.post("/:bookId/rate", authenticateJWT, bookController.rateBook);

module.exports = router;
