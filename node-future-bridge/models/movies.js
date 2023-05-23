const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    releasedDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Movies', moviesSchema);