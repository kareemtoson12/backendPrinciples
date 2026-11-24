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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});