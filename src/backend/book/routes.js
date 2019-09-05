module.exports = (app) => {
    const books = require('./controller');

    // Create a new Book
    app.post('/book', books.create);

    // Retrieve all Book
    app.get('/book', books.findAll);

    // Retrieve all Book
    app.get('/book/all', books.findAll);

    // Retrieve all Book by search question
    app.post('/book_search', books.findBooksBySearch);

    // Retrieve a single Book with categoryName
    app.get('/book/category/:category', books.findByCategory);

    // Retrieve Books with filters
    app.get('/book/filter/', books.findBooks);

     // Retrieve a single Book with categoryName
     app.get('/book/:id', books.findById);

    // Update a Book with bookId
    app.put('/book/:id', books.update);

    // Delete a Book with bookId
    app.delete('/book/:id', books.delete);
};