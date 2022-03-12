const path = require('path');
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const mongoose = require('mongoose');

const config = require('../config');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const router = express.Router();
const upload = multer({ storage });

router.get('/', async (req, res, next) => {
    try {
        let filter = {};

        const category = req.query.category;
        if (category) {
            filter.category = category;
        }

        const items = await Item.find(filter);
        return res.send(items);
    } catch (e) {
        return next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate('user', ['name', 'phone'])
            .populate('category', 'name');

        if (!item) {
            return res.status(404).send({error: 'Page not found'});
        }

        return res.send(item);
    } catch (e) {
        return next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        const itemData = req.body;
        itemData.user = req.user.id;

        if (req.file) {
            itemData.image = req.file.filename;
        }

        const item = new Item(itemData);
        await item.save();

        return res.send(item);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send({error: 'Page not found'});
        }

        const isMatch = item.checkUser(req.user._id);
        if (!isMatch) {
            return res.status(403).send({error: 'You cannot perform this action'});
        }

        await item.remove();
        return res.send({message: 'ok'});
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
