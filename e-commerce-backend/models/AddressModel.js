const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true
     },
     addressLine1: {
          type: String,
          required: true
     },
     addressLine2: {
          type: String,
     },
     city: {
          type: String,
          required: true
     },
     state: {
          type: String,
          required: true
     },
     postalCode: {
          type: String,
          required: true
     },
     country: {
          type: String,
          required: true
     },
     createdAt: {
          type: Date,
          default: Date.now,
     },
     isDeleted: {
          type: Boolean,
          default: false
     },
     isDeletedAt: {
          type: Date,
     },
     status: {
          type: String,
          enum: ["active", "inactive"],
          default: "active",
     },
});

module.exports = mongoose.model("addresses", addressSchema);
