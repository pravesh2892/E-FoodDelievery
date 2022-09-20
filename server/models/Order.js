/**
 * Created by Academy
 */
var mongoose = require("mongoose");
Schema = mongoose.Schema;

//Define your order schema here
var orderSchema = new mongoose.Schema({
  item: [{
      name: { type: String, required: [true,"The name is required"] },
      description: { type: String, required: [true,"The description is required"] },
      price: { type: Number, required: [true,"The price is required"] },
      quantity: { type: Number, required: [true,"The quantity is required"] },
    },
  ],
  checkOutDetails: [
    {
      Name: { type: String, required: [true,"The Name is required"] },
      Address: [{
          line1: { type: String, required: [true,"The line1 is required"] },
          country: { type: String, required: [true,"The country is required"] },
          state: { type: String, required: [true,"The state is required"] },
          pinCode: { type: Number, required: [true,"The pinCode is required"] },
        },
      ],
    },
  ],
  total: { type: Number },
  date: { type: Date, required: true, default: Date.now },
});

var Order = mongoose.model("Order", orderSchema);
module.exports = Order;



