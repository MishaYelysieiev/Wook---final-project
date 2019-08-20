module.exports = (app) => {
    const books = require('./controller');

    // Create a new Book
    app.post('/book', books.create);

    // Retrieve all Book
    app.get('/book', books.findAll);

    // Retrieve a single Book with categoryName
    app.get('/book/:category', books.findByCategory);

    // Update a Book with bookId
    app.put('/book/:id', books.update);

    // Delete a Book with bookId
    app.delete('/book/:id', books.delete);
};