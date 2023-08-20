// src/models.ts
interface Author {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  chapters: number;
  pages: number;
  authors: Author[];
}

const authors: Author[] = [];
const books: Book[] = [];

export { Author, Book, authors, books };
