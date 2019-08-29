const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const Cart = new Schema(
    {
        id: Number,
        currency: {type: String, required: true},
        cartTotal: {type: Number, required: false},
        // customerInfo: { type: Schema.ObjectId, ref: "User", required: true  }, TODO: create link to user model
        customerInfo: {type: String, required: false},
        books: [
            {type: Schema.ObjectId, ref: 'Book'}
        ]
    });


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Cart", Cart);