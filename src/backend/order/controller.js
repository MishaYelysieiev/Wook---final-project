const Order = require('./model');

//Create new Order
exports.create = async (req, res) => {
    // Request validation

    if (!req.body) {
        return res.status(400).send({
            message: "Order can not be empty"
        });
    }

    let order = await new Order({
        number: req.body.number,
        date: req.body.date,
        currency: req.body.currency,
        orderTotal: req.body.orderTotal,
        user: req.body.user,
        books: req.body.books,
        delivery_address:req.body.delivery_address
    })

    await order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the order."
            });
        });
};
// Retrieve all orders from the database.
exports.findAll = async (req, res) => {
    await Order.find()
        .populate('user')
        .populate('book')
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Any orders not found"
                });
            }
            res.send(order);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving orders."
            });
        });
};

// Find array of order by id
exports.findById = async (req, res) => {
    await Order.findById(req.params.id)
        .populate('user')
        .populate('book')
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            res.send(order);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            console.log(err);
            return res.status(500).send({
                message: "Wrong retrieving order with id " + req.params.id
            });
        });
};


// Update a order
exports.update = async (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }
    // Find and update product with the request body
    await Order.findByIdAndUpdate(req.params.id, {
        number: req.body.number,
        date: req.body.date,
        currency: req.body.currency,
        orderTotal: req.body.orderTotal,
        user: req.body.user,
        books: req.body.books,
        delivery_address:req.body.delivery_address
    }, {new: true})
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong when updating order with id " + req.params.id
            });
        });
};

// Delete a order with the specified id in the request
exports.delete = async (req, res) => {
    await Order.findByIdAndRemove(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
                });
            }
            res.send({message: "order deleted successfully!"});
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete order with id " + req.params.id
            });
        });
};

// Find user orders
exports.findUserOrders = (req, res) => {
    console.log(req.user._id)
    Order.find({ user: req.user._id})
        .populate ('user')
        .populate('book')
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Orders not found"
                });
            }
            res.send(order);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Orders not found"
                });
            }
            console.log(err);
            return res.status(500).send({
                message: "Wrong retrieving orders"
            });
        });
};