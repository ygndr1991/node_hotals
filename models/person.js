const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.pluralize(null);
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


// hashing Password
personSchema.pre('save', async function (next) {
    const person = this;
    // hash the password only if it has been modified or is new.
    if (!person.isModified('password')) return next();

    try {
        // create salt
        const salt = await bcrypt.genSalt(10);
        // generate hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        // override the password
        person.password = hashedPassword;
        next();
    }
    catch (error) {
        return next(error);
    }
})

// bcrypt.compare Password
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        console.log("error", isMatch);
        throw error;
    }
}

// create model

const person = mongoose.model('person', personSchema);
module.exports = person;


