module.exports = (app) => {
    const category = require('./controller');

    // Create a new Product
    app.post('/category', category.create);

    // Retrieve all Products
    app.get('/category', category.findAll);

    // Retrieve a single Product with productId
    app.get('/category/:id', category.findOne);

    // Update a Note with productId
    app.put('/category/:id', category.update);

    // Delete a Note with productId
    app.delete('/category/:id', category.delete);
};