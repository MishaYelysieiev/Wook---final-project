const Book = require('./model');
const Author = require('../models/author');

//Create new Product
exports.create = async (req, res) => {
    // Request validation

    if (!req.body) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }



    let author = await Author.findOneAndUpdate(
        {name: req.body.author}, // find a document with that filter
        {name: req.body.author}, // document to insert when nothing was found
        {upsert: true, new: true}) // options
        .then(auth =>{
               return auth
        })
        .catch(err => {
            return res.status(500).send({
                message: "Something wrong when creating author " + req.body.author
            });
        });
    

    let book = await new Book({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        author: author._id,
        image: req.body.image
    });

    await book.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the book."
            });
        });
};
// Retrieve all books from the database.
exports.findAll = (req, res) => {
    Book.find()
        .populate('author', 'name')
        .populate('category', 'name')
        .then(books => {
            if (!books) {
                return res.status(404).send({
                    message: "Book not found with category " + req.params.category
                });
            }
            res.send(books);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving books."
        });
    });
};

// Find array of books with a necessary category
exports.findByCategory = (req, res) => {
    Book.find()
        .populate ('author')
        .populate('category')
        .then(books => {
            const resultBooks = books.filter(books => {
                return books.category.name.toLowerCase() === req.params.category.toLowerCase();
            });
            if (!books) {
                return res.status(404).send({
                    message: "Book not found with category " + req.params.category
                });
            }
            res.send(resultBooks);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not found with category " + req.params.category
                });
            }
            console.log(err);
            return res.status(500).send({
                message: "Wrong retrieving book with category " + req.params.category
            });
        });
};


// Update a product
exports.update = async (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }
    // Find and update product with the request body
    await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        author:  req.body.author,
        image: req.body.image
    }, {new: true})
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            res.send(book);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong when updating book with id " + req.params.id
        });
    });
};

// Delete a book with the specified id in the request
exports.delete = async (req, res) => {
    await Book.findByIdAndRemove(req.params.id)
        .then(book => {
            if (!book) {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id
                });
            }
            res.send({message: "Book deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.id
        });
    });
};

// Find array of books by search query
exports.findBooksBySearch = (req, res) => {
    const regExp = new RegExp(req.body.q, 'i');
    Book.find({
        // title: new RegExp(req.params.q, 'i')
        $or: [
            {title: regExp},
            {description: regExp}
            ]
    })
        .populate('category')
        .populate ('author')
        .then(books => {
            // const resultBooks = books.filter(books => {
            //     return books.category.name.toLowerCase() === req.params.category.toLowerCase();
            // });
            if (!books) {
                return res.status(404).send({
                    message: "Book not found"
                });
            }
            res.send(books);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not found"
                });
            }
            console.log(err);
            return res.status(500).send({
                message: "Wrong retrieving book"
            });
        });
};
