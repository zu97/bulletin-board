const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Item = require('./models/Item');
const Category = require('./models/Category');

const run = async () => {
    await mongoose.connect(config.mongoConfig.url, config.mongoConfig.options);
    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [anna, john] = await User.create({
        email: 'anna@gmail.com',
        password: '123',
        name: 'Anna Marie',
        phone: '+18942365425',
        token: nanoid()
    }, {
        email: 'john@gmail.com',
        password: '123',
        name: 'John Doe',
        phone: '+15624567821',
        token: nanoid()
    });

    const [computers, cars, other] = await Category.create({
        name: 'Computers'
    }, {
        name: 'Cars'
    }, {
        name: 'Other'
    });

    await Item.create({
        user: john,
        category: cars,
        title: 'Toyota Land Cruiser',
        description: 'Sell Toyota Land Cruiser. Call the phone number!',
        image: 'toyota.jpg',
        price: 7540000
    }, {
        user: anna,
        category: other,
        title: 'Looking for workers to work remotely',
        description: 'Looking for workers to work remotely. Payment twice a month without delay. Salary 35000',
        image: 'work.jpg',
        price: 35000
    }, {
        user: anna,
        category: computers,
        title: 'I will sell the computer',
        description: 'Selling 3 office computers. Reason for selling, bought a newer.',
        image: 'pc.jpg',
        price: 4000
    }, {
        user: john,
        category: cars,
        title: 'Selling a set of tires',
        description: 'Selling a set of tires for Toyota Land Cruiser. New.',
        image: 'tires.jpg',
        price: 25000
    }, {
        user: john,
        category: other,
        title: 'Sell phone',
        description: 'Selling phone, almost new, complete set',
        image: 'phone.jpg',
        price: 12800
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));