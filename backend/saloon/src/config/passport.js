// const localStrategy = require('passport-local').Strategy;
// const Stylist = require('../model/stylist');
// const config = require('../config/sequelize');
// const bcrypt = require('bcryptjs');

// module.exports = function(){
//     // //local Strategy
//     // passport.use(new localStrategy(function(username,password,done){
//     //     let query = {username}
//     // }))
// }

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy,
    db = require('../model')

//serialization sessions
passport.serializeUser(function (user, done) {
    done(null, user);
})

//deserialization sessions
passport.deserializeUser(function (user, done) {
    db.user.find({ where: { id: user.id } }).success(function (user) {
        done(null, user);
    }).error(function (err) {
        done(err, null)
    });
});

//for authentication purposes
passport.use(new LocalStrategy(function (username, password, done) {
    db.User.find({ where: { username: username } }).success(function (user) {
        pwd = user ? user.password : ''
        isMatch = db.User.validPassword(password, pwd, done, user)
    })
}))