const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const Order = new Schema(
    {
        number: {type: String, required: true},
        date: {type: String, required: true},
        currency: {type: String, required: true},
        orderTotal: {type: Number, required: false, default: 0},
        user: {type: String, required: false},
        books: [
            {
            book_id: {type: Schema.ObjectId, ref: 'Book'},
            quantity: {type: String, required: true}
            }
        ],
        delivery_address: {
            country: {
              type: String,
              required: false,
              minlength: 2,
              maxlength: 1024
            },
            city:{
              type: String,
              required: false,
              minlength: 2,
              maxlength: 1024
            },
            street:{
              type: String,
              required: false,
              minlength: 5,
              maxlength: 1024
            }
          },
    });


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Order", Order);