module.exports = (app) => {
    const category = require('./controller');

    // Create a new category
    app.post('/api/category', category.create);

    // Retrieve all category
    app.get('/api/category', category.findAll);

    // Retrieve a single category with id
    app.get('/api/category/:id', category.findOne);

    // Update a category with id
    app.put('/api/category/:id', category.update);

    // Delete a category with id
    app.delete('/api/category/:id', category.delete);
};