const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Author = new Schema(
    {
        name: {type: String, required: true, max: 100}
    }
);

// Virtual for author's URL
Author
    .virtual('url')
    .get(function () {
        return '/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', Author);