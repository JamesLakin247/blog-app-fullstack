const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a post title']
    },
    content: {
        type: String,
        required: [true, 'Please write a post body']
    },
    createdBy: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema)