const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const completedQuestSchema = new mongoose.Schema({
    completed: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an user'
    },
    quest: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quest',
        required: 'You must supply a Quest'
    },
    text: {
        type: String,
    },
    photo: String
});

function autoPopulate(next) {
    this.populate('user'),
    next();
}

function autoPopulate(next) {
    this.populate('quest'),
    next();
}

completedQuestSchema.pre('find', autoPopulate);
completedQuestSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('CompletedQuest', completedQuestSchema);