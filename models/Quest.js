const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const questSchema = new mongoose.Schema( {
    name: {
        type: String,
        trim: true,
        required: 'Please enter a quest name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coodrinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        cityCoodrinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        city: {
            type: String,
        },
        address: {
            type: String,
            required: 'You must supply an address!'
        }
    },
    photo: String,
    price: {
        type: String
    },
    estimatedTime: {
        type: String
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an author'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

questSchema.index({
    name: 'text',
    description: 'text',
    "location.city": 'text',
    "location.address": 'text'
});

questSchema.pre('save', async function(next) {
    if(!this.isModified('name')) {
        return next();
    }
    this.slug = slug(this.name);

    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
    const questsWithSlug = await this.constructor.find({slug: slugRegEx});

    if(questsWithSlug.length) {
        this.slug = `${this.slug}-${questsWithSlug.length + 1}`;
    }

    next();
});

questSchema.statics.getTagsList = function() {
    return this.aggregate([
        { $unwind: '$tags'},
        { $group: {_id: '$tags', count: {$sum: 1 }}},
        { $sort: {count: -1}}
    ]);
}

questSchema.statics.getCities = function() {
    return this.aggregate([
        { $unwind: '$location.city'},
        { $group: {_id: '$location.city', count: {$sum: 1 }}}
    ]);
}

questSchema.statics.getTagsInCities = function() {
    return this.aggregate([
        { $group:  { _id: '$location.city', tags: { $push: '$tags'}}}
    ]);
}

module.exports = mongoose.model('Quest', questSchema);