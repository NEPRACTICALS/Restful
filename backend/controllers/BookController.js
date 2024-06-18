// BOOK CONTROLLER 

const { Op } = require("sequelize");
const Book = require("../models/Book");
const { validate } = require("../utils/BookValidation");

// Function to create Books which takes name,author,email,publisher,publicationYear,subject from frontend and return book

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

// function to get book all books 

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching books");
  }
};


// function to get book by id 

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

// function to  update book by id 


 exports.updateBookById = async (req, res) => {
   const bookId = req.params.id;
   const { name, author, email, publisher, publicationYear, subject } =
     req.body; // Destructure specific fields from req.body

   try {
     // Find the book by its ID
     const book = await Book.findByPk(bookId);

     // If the book is not found, return a 404 status with an appropriate message
     if (!book) {
       return res.status(404).json({ message: "Book not found" });
     }

     // Update the book with the specific fields
     await book.update({
       name,
       author,
       email,
       publisher,
       publicationYear,
       subject
     });

     // Send a success response with the updated book data
     res.status(200).json(book);
   } catch (error) {
     console.error("Error updating book:", error);
     // If there is an error, send a 500 status with an appropriate message
     res.status(500).json({ message: "Internal server error" });
   }
 };

// function to delete book by id 

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
