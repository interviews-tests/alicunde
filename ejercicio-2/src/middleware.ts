import { Request, Response, NextFunction } from "express";
import { Author, Book } from "./models";

// Middleware function to validate request body for creating authors
export function validateAuthor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newAuthor = req.body as Author;

  if (!newAuthor.id || !newAuthor.name) {
    return res.status(400).json({ message: "Invalid author data" });
  }

  next();
}

// Middleware function to validate request body for creating books
export function validateBook(req: Request, res: Response, next: NextFunction) {
  const newBook = req.body as Book;

  if (
    !newBook.id ||
    !newBook.title ||
    !newBook.chapters ||
    !newBook.pages ||
    !newBook.authors
  ) {
    return res.status(400).json({ message: "Invalid book data" });
  }

  next();
}
