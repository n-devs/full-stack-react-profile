const mongose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    },
    img_profile:[{img:{ data: Buffer, contentType: String }}],
    head_story: String,
    story: String,
    content_about: String
});

UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
        .exec((err, user) => {
            if (err) {
                return callback(err)
            } else if (!user) {
                const err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        })
}

//hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
//     var user = this;
//     bcrypt.hash(user.password, 10, function (err, hash) {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     })
//   });

var User = mongose.model('User', UserSchema);
module.exports = User;