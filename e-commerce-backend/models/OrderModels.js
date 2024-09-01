const mongoose = require("mongoose");

const orederSchema = new mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true
     },
     product: [{
          item_id: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "inventories",
               required: true
          },
          quantity: {
               type: Number,
               required: true
          },
     }],
     totalPrice: {
          type: Number,
          required: true
     },
     createdAt: {
          type: Date,
          default: Date.now,
     },
     status: {
          type: String,
          enum: ["pending", "Dispatched","shipped","Out of Delivered","delivered"],
          default: "pending",
      },
      address: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "addresses",
          required: true
     },
});

module.exports = mongoose.model("orders", orederSchema);