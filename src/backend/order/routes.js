const passport = require('passport');
require('../config/passport')(passport)

module.exports = (app) => {
    const order = require('./controller');

    // Create a new order
    app.post('/order', order.create);

    // Retrieve all orders
    app.get('/order', order.findAll);

    // Retrieve a single order with id
    app.get('/order/:id', order.findById);

    // Update a order with id
    app.put('/order/:id', order.update);

    // Delete a order with id
    app.delete('/order/:id', order.delete);

    // Retrieve orders by user_id
    app.get('/user/order/', passport.authenticate('jwt', {session: false}), order.findUserOrders);
};