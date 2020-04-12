const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateRegistered: {
    type: Date,
    default: new Date()
  }
  //image: String
});

//encrypt password
UserSchema.pre('save', function(next) {
  const user = this
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User
