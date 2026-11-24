const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
//List of Books
let books = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1'
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Author 2'
  },
  {
    id: 3,
    title: 'Book 3',
    author: 'Author 3'
  }
];
//get this books

app.get('/books', (req, res) => {
  res.json({
    status: 'success',
    length: books.length,
    data: {
      books
    }
  });
});

//search books using query parameters
app.get('/books/search', (req, res) => {
  const { title, author } = req.query;
  const filteredBooks = books.filter(book => {
    if (title && !book.title.toLowerCase().includes(title.toLowerCase())) {
      return false;
    }
    if (author && !book.author.toLowerCase().includes(author.toLowerCase())) {
      return false;
    }
    return true;
  });
  res.json({
    status: 'success',
    length: filteredBooks.length,
    data: {
      books: filteredBooks
    }
  });
});



//get single book by id
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find(book => book.id == id);
  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Book not found'
    });
  }
  res.json({
    status: 'success',
    data: {
      book
    }
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});