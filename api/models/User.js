const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (value) {
                if (!this.isModified('email')) return true;

                const user = await User.findOne({ email: value });
                return !user;
            },
            message: 'This user is already registered'
        },
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

const SALT_WORK_FACTOR = 10;

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
