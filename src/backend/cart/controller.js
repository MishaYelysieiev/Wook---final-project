const Cart = require('./model');

//Create new cart
exports.create = async (req, res) => {
    // Request validation

    if (!req.body) {
        return res.status(400).send({
            message: "Cart can not be empty"
        });
    }
    let booksId = await req.body.books.split(',');

    let cart = await new Cart({
        currency: req.body.currency,
        cartTotal: req.body.cartTotal,
        customerInfo: req.body.customerInfo,
        books: booksId
    })

    await cart.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the book."
            });
        });
};
// Retrieve all carts from the database.
exports.findAll = async (req, res) => {
    await Cart.find()
    // .populate('user')
        .populate('book')
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "Any carts not found"
                });
            }
            res.send(cart);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving carts."
            });
        });
};

// Find array of cart by id
exports.findById = async (req, res) => {
    await Cart.findById(req.params.id)
    // .populate('user')
        .populate('book')
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "Cart not found with id " + req.params.id
                });
            }
            res.send(cart);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Cart not found with id " + req.params.id
                });
            }
            console.log(err);
            return res.status(500).send({
                message: "Wrong retrieving cart with id " + req.params.id
            });
        });
};


// Update a product
exports.update = async (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Cart content can not be empty"
        });
    }
    // Find and update product with the request body
    let booksId = await req.body.books.split(',');
    await Cart.findByIdAndUpdate(req.params.id, {
        currency: req.body.currency,
        cartTotal: req.body.cartTotal,
        customerInfo: req.body.customerInfo,
        books: booksId
    }, {new: true})
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "Cart not found with id " + req.params.id
                });
            }
            res.send(cart);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Cart not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong when updating cart with id " + req.params.id
            });
        });
};

// Delete a cart with the specified id in the request
exports.delete = async (req, res) => {
    await Cart.findByIdAndRemove(req.params.id)
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "Cart not found with id " + req.params.id
                });
            }
            res.send({message: "Cart deleted successfully!"});
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Cart not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete cart with id " + req.params.id
            });
        });
};
