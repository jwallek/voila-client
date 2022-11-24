const mongoose = require('mongoose')

const SavedWordSchema = new mongoose.Schema({
    result: {
        type: String
    },
    q: {
        type: String
    },
    source: {
        type: String
    },
    target: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }


});

module.exports = mongoose.model('SavedWord', SavedWordSchema)