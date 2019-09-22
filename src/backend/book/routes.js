module.exports = (app) => {
    const books = require('./controller');

    // Create a new Book
    app.post('/api/book', books.create);

    // Retrieve all Book
    app.get('/api/book', books.findAll);

    // Retrieve all Book
    app.get('/api/book/all', books.findAll);

    // Retrieve all Book by search question
    app.post('/api/book_search', books.findBooksBySearch);

    // Retrieve a single Book with categoryName
    app.get('/api/book/category/:category', books.findByCategory);

    // Retrieve Books with filters
    app.get('/api/book/filter/', books.findBooks);

     // Retrieve a single Book with categoryName
     app.get('/api/book/:id', books.findById);

    // Update a Book with bookId
    app.put('/api/book/:id', books.update);

    // Delete a Book with bookId
    app.delete('/api/book/:id', books.delete);
};