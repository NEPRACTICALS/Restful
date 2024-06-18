

const { Op } = require("sequelize");
const Book = require("../models/Book");
const { validate } = require("../utils/BookValidation");

exports.createBook = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const book = await Book.create({
      name: req.body.name,
      author: req.body.author,
      email: req.body.email,
      publisher: req.body.publisher,
      publicationYear: req.body.publicationYear,
      subject: req.body.subject
    });

    res.status(201).send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the Book");
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching books");
  }
};

exports.getBookById = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the book");
  }
};

exports.updateBookById = async (req, res) => {
  const bookId = req.params.id;
  const updatedData = req.body; // Assuming the updated employee data is in the request body

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.update(updatedData);

    res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteBookById = async (req, res) => {
  const bookId = req.params.id;

  try {
    const result = await Book.findByPk(bookId);
    if (!result) {
      return res.status(404).send("Book not found");
    }
    await Book.destroy({
      where: {
        id: bookId
      }
    });
    res.status(200).send("Book deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the Book");
  }
};
