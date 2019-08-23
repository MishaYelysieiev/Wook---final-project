module.exports = (app) => {
    const cart = require('./controller');

    // Create a new cart
    app.post('/cart', cart.create);

    // Retrieve all cart
    app.get('/cart', cart.findAll);

    // Retrieve a single cart with id
    app.get('/cart/:id', cart.findById);

    // Update a cart with id
    app.put('/cart/:id', cart.update);

    // Delete a cart with id
    app.delete('/cart/:id', cart.delete);
};