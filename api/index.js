const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const categories = require('./app/categories');
const items = require('./app/items');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', users);
app.use('/categories', categories);
app.use('/items', items);

(async () => {
    await mongoose.connect(config.mongoConfig.url, config.mongoConfig.options);

    app.listen(port, () =>  {
        console.log(`Server started on ${port} port`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
})();
