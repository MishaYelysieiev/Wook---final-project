const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const Book = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        price: { type: Number, required: true, index: true },
        category: { type: Schema.ObjectId, ref: "Category", required: true },
        author: { type: Schema.ObjectId, ref: 'Author', required: true },
        image: {
           small:  {type: String, required: false },
           detailed:  {type: String, required: false }
        },
        rating: { type: String, required: true, index: true },
        stock: { type: Boolean, required: true },
        date: { type: String, required: true, default: Date.now, index: true },
        details: {
            product_code:  { type: String, required: false, uniqe: true },
            pages:  { type: Number, required: false },
            size:  { type: String, required: false },
            language:  { type: String, required: false },
            public_date:  { type: String, required: false },
        },
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