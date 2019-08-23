module.exports = (app) => {
    const category = require('./controller');

    // Create a new category
    app.post('/category', category.create);

    // Retrieve all category
    app.get('/category', category.findAll);

    // Retrieve a single category with id
    app.get('/category/:id', category.findOne);

    // Update a category with id
    app.put('/category/:id', category.update);

    // Delete a category with id
    app.delete('/category/:id', category.delete);
};