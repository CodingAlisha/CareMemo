// Replace this file with the definition of the data models
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'], 
        minlength: [6, 'Minimum password length is 6 characters'],
    },
});

// Do a function after doc is saved to db
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)

});

// Static method to login a registered user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;