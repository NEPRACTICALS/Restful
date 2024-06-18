const express = require('express')
const router = express.Router()

const {
  createBook,
  getAllBooks,
  getBookById,
  deleteBookById,
  updateBookById
} = require("../controllers/BookController");

const authMiddleware = require("../middleware/auth")

router.post("/create/book", [authMiddleware], createBook);
router.get("/all/books", [authMiddleware], getAllBooks);
router.get("/book/:id", [authMiddleware], getBookById);
router.put("/book/update/:id", [authMiddleware], updateBookById);
router.delete("/book/delete/:id", [authMiddleware], deleteBookById);

module.exports.BookRoutes = router ;