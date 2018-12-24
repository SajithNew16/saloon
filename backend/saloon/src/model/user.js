const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, type) => {
    var User = sequelize.define('User', {
        userName: {
            type: STRING,
            unique: true
        },
        password: {
            type: STRING
        }
    }, {
            classMethods: {
                validPassword: function (password, pwd, done, user) {
                    bycrypt.compare(password, pwd, function (err, isMatch) {
                        if (err)
                            console.log(err)
                        if (isMatch) {
                            return done(null, user)
                        }
                        else {
                            return done(null, false)
                        }
                    });
                }

            }
        },
        {
            dialect: 'mysql'
        }
    );

    User.hook('beforeCreate', function (user, fn) {
        var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            return salt
        });
        bcrypt.hash(user.password, salt, nulll, function (err, hash) {
            if (err)
                return next(err);
        })
    })

    return User;
}