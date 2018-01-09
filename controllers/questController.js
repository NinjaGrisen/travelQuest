const mongoose = require('mongoose');
const Quest = mongoose.model('Quest');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');


const multerOptions = {
    storage: multer.memoryStorage(),
    filteFilter(req, file, next) {
        const isPhoto = file.mimetype.startWith('image/');
        if(isPhoto) {
            next(null, true);
        } else {
            next({message: 'that file type is\'nt allowed!' }, false)
        }
    }
};

exports.homePage = (req, res) => {
    res.render('index');
};

exports.addQuest = (req, res) => {
    res.render('editQuest', {
        title: 'Add quest'
    });
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async(req, res, next) => {
    if(!req.file) {
        next();
        return;
    } 
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`;

    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);

    await photo.write(`./public/uploads/${req.body.photo}`);

    next();
};

exports.createQuest = async (req, res) => {
    req.body.author = req.user._id;

    const quest = await (new Quest(req.body)).save();
    req.flash('success', `Successfully Created ${quest.name}`);
    res.redirect(`/quest/${quest.slug}`);
};

exports.getQuests = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 4;
    const skip = (page * limit) - limit;

    const questsPromise = Quest
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ created: 'desc'});
    
    const countPromise = Quest.count();

    const [quests, count] = await Promise.all([questsPromise, countPromise]);
    const pages = Math.ceil(count / limit);

    if(!quests.length && skip) {
        req.flash('info', `Hey you asked for page ${page}. That does not exist so I put you on ${pages}`)
        res.redirect(`/quests/page/${pages}`);
        return;
    }

    res.render('quests', {title: 'Quest', quests, page, pages, count});
};
const confirmOwnerOrAdmin = (quest, user) => {
    if(!user.admin) {    
        if(!quest.author.equals(user._id)) {
            throw Error('You must have created this page to edit it!');
        }
    }
}
exports.editQuest = async (req, res) => {
    
    const quest = await Quest.findOne({_id: req.params.id});
    confirmOwnerOrAdmin(quest, req.user);
    res.render('editquest', {title: `Edit ${quest.name}`, quest});
};


exports.updateQuest = async (req, res) => {
    req.body.location.type = "Point";
    const quest = await Quest.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    }).exec();
    req.flash('success', 
        `Successfully updated <strong>${quest.name} 
        </strong> <a href="/quest/${quest.slug}">View quest</a>`);
    res.redirect(`/quests/${quest._id}/edit`)
};

exports.getQuestBySlug = async (req, res, next) => {
    const quest = await Quest.findOne({ slug: req.params.slug });
    if(!quest) {
        return next();
    }
    res.render('quest', {quest, title: quest.name});
};

exports.getQuestByTag = async (req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || { $exists: true };
    const tagsPromise = Quest.getTagsList();
    const questPromise = Quest.find({ tags:  tagQuery});
    const [tags, quests] = await Promise.all([tagsPromise, questPromise]);

    res.render('tag', {tags, title: 'Tags', tag, quests});
};

exports.searchQuests = async (req, res) => {
    const quests = await Quest
    .find({
        $text: {
            $search: req.query.q
        }
    }, {
        score: { $meta: 'textScore' }
    })
    .sort({
        score: { $meta: 'textScore' }
    })
    .limit(5);
  
    res.json(quests);
};

exports.heartQuest = async(req, res) => {
    const hearts = req.user.bookmarked.map(obj => obj.toString());

    const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User
        .findByIdAndUpdate(
            req.user._id, 
            { [operator]: {bookmarked: req.params.id} },
            { new: true }
    );
    res.json(user);
};

exports.completeQuest = async(req, res) => {
    const complete = req.user.completed.map(obj => obj.toString());

    const operator = complete.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User
        .findByIdAndUpdate(
            req.user._id, 
            { [operator]: {completed: req.params.id} },
            { new: true }
    );
    res.json(user);
}

exports.getHearts = async(req, res) => {

    const quests = await Quest.find({
        _id: { $in: req.user.bookmarked }
    });

    res.render('quests', {title: 'Hearted quests', quests} );
};
