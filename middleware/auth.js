const Person = require('../models/person');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authFunction = (new LocalStrategy(async (UserName, PassWord, done) => {
    // console.log(UserName, PassWord)
    try {
        const user = await Person.findOne({ username: UserName });
        if (!user) {
            return done(null, false, { message: 'Incorrect Username' })
        }
        const isPasswordMatch = await user.comparePassword(PassWord);
        if (isPasswordMatch) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'Incorrect Password' })
        }
    }
    catch (error) {
        return done("MiddlewareError", error);
    }
}))

module.exports = authFunction;

