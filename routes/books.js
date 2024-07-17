const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method : Get
 * Description:Get all books
 * Access:Public
 * Parameters:None
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Got all the books",
    data: books,
  });
});

/**
 * Route: /books/issued
 * Method : Get
 * Description:Get all issuedbook
 * Access:Public
 * Parameters:None
 */
router.get("/issued", (req, res) => {
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet..",
    });
  }
  return res.status(200).json({
    success: true,
    message: "users with issued Books...",
    data: issuedBooks,
  });
});

/**
 * Route: /books/:id
 * Method : Get
 * Description:Get book by id
 * Access:Public
 * Parameters:ID
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Found The Book by thier ID",
    data: book,
  });
});

module.exports = router;
