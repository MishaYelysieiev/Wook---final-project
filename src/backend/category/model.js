const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const Category = new Schema(
    {
        id: Number,
        name: String,
        // books: [{type: Schema.ObjectId, ref: 'Books'}]
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Category", Category);