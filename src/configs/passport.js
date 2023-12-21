const passport = require('passport');
const { BcryptUtil } = require('../utils');
const { UserModel } = require('../models');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    profileFields: ['id', 'displayName'],
}, async (accessToken, refreshToken, profile, done) => {
    const user = {
        id: profile.id,
        fullname: profile.displayName,
        email: profile.id,
        password: null,
        source: 'facebook',
        accessToken,
        refreshToken,
    };
    const existedUser = await UserModel.findById(user.id);
    if (existedUser !== null) {
        return done(null, existedUser);
    }
    const newUser = await new UserModel(user).save();
    return done(null, newUser);
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback',
}, async (token, tokenSecret, profile, done) => {
    const user = {
        id: profile.id,
        fullname: profile.displayName,
        email: profile.id,
        password: null,
        source: 'facebook',
        accessToken: token,
        refreshToken: tokenSecret,
    };
    const existedUser = await UserModel.findById(user.id);
    if (existedUser !== null) {
        return done(null, existedUser);
    }
    const newUser = await new UserModel(user).save();
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (usename, done) => {
    try {
        const user = await UserModel.getByemail(usename);
        if (user === null) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;
