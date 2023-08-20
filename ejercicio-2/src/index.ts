// src/index.js
import express from "express";
import bodyParser from "body-parser";
import { Author, Book, authors, books } from "./models";
import { validateAuthor, validateBook } from "./middleware";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/authors", validateAuthor, (req, res) => {
  const newAuthor = req.body as Author;
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// Obtener todos los autores con los libros que tengan
app.get("/authors", (req, res) => {
  const authorsWithBooks = authors.map((author) => ({
    ...author,
    books: books.filter((book) => book.authors.some((a) => a.id === author.id)),
  }));
  res.json(authorsWithBooks);
});

// Crear un nuevo libro
app.post("/books", validateBook, (req, res) => {
  const newBook = req.body as Book;
  books.push(newBook);
  res.status(201).json(newBook);
});

// Obtener todos los libros con sus autores
app.get("/books", (req, res) => {
  res.json(books);
});

// Obtener Promedio de Páginas por Capítulo
app.get("/books/:id/average-pages-per-chapter", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    res.status(404).json({ message: "Book not found" });
    return;
  }

  const average = book.pages / book.chapters;
  res.json({
    bookId: book.id,
    averagePagesPerChapter: average.toFixed(2),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
