const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Author = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        given_name: {type: String, required: true, max: 100}
    }
);

// Virtual for author's full name
Author
    .virtual('name')
    .get(function () {
        return this.given_name + ', ' + this.first_name;
    });

// Virtual for author's URL
Author
    .virtual('url')
    .get(function () {
        return '/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', Author);