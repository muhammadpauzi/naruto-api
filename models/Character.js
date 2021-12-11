const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    name: {
        type: String
    },
    picture: {
        type: String,
        default: 'default.jpg'
    }
})
// Full full-text search
characterSchema.index({ name: 'text' });

module.exports = mongoose.model('Character', characterSchema);