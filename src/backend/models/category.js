const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const Category = new Schema(
    {
        id: Number,
        name: String,
        products: [{type: Schema.ObjectId, ref: 'Products'}]
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Category", Category);