const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const completedPhotoSchema = new mongoose.Schema({
    completed: {
        type: Date,
        default: Date.now
    },
    quest: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quest',
        required: 'You must supply a text'
    },
    text: {
        type: String,
    }
});

function autoPopulate(next) {
    this.populate('author'),
    next();
}

completedPhotoSchema.pre('find', autoPopulate);
completedPhotoSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('CompletedPhotos', completedPhotoSchema);