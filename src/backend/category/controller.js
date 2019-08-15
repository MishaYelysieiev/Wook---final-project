const Category = require('./model');


//Create new Product
exports.create =  async (req, res) => {
    console.log(req);
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    let category = await new Category({
        name: req.body.name,
    });

    await category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the category."
        });
    });
};
// Retrieve all categories from the database.
exports.findAll = (req, res) => {
    Category.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};

// Find a single category with a productId
exports.findOne = (req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            if(!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send(category);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Category wrong retrieving product with id " + req.params.id
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Category content can not be empty"
        });
    }

    // Find and update product with the request body
    Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Category name can not be empty"
    }, {new: true})
        .then(category => {
            if(!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send(category);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send({message: "Category deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.id
        });
    });
};