const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
     email: {
          type: String,
          required: true,
          unique: true,
     },
     password: {
          type: String,
          required: true,
     },
     Username: {
          type: String,
          required: true,
     },
     createAt: {
          type: Date,
          default: Date.now,
     },
     phone: {
          type: String,
          require: true,
     },
     profilePhoto: {
          type: String,
     },
});

module.exports = mongoose.model('user', UserSchema);