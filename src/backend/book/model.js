const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const Book = new Schema(
    {
        id: Number,
        title: { type: String, required: true },
        description: { type: String, required: false },
        price: { type: Number, required: true },
        category: { type: Schema.ObjectId, ref: "Category", required: true },
        author: { type: Schema.ObjectId, ref: 'Author', required: true },
        // author: { type: String, required: false }, // before Author model creation
        image: { type: String, required: true }
    }
);


// Virtual for book's URL
Book
    .virtual('url')
    .get(function () {
        return '/book/' + this._id;
    });
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Book", Book);