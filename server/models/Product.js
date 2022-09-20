// var mongoose = require('mongoose');

var uniqueValidator = require("mongoose-unique-validator");

//importing mangoose
var mongoose = require("mongoose");

Schema = mongoose.Schema;

// creating a schema
const productSchema = new mongoose.Schema({
  //creating a name parameter in schema
  name: {
    type: String,
    required: [true, "Product name is mandatory"],
    unique: [true, "Product name must be unique"],
  },
  //creating a category parameter in schema
  category: {
    type: String,
    required: [true, "Category is mandatory"],
  },
  //creating a description parameter in schema
  description: {
    type: String,
    required: [true, "Description is mandatory"],
  },
  //creating a price parameter in schema
  price: {
    type: Number,
    required: [true, "Price is required in number"],
    maxlength: [5, "Price can not be more then 5 digit "],
  },
  //creating a productImage parameter in schema
  productImg: {
    fileName: {
      type: String,
      required: true,
    },
    filePath: { type: String, required: [true, "Should be exact"] },
    fileType: { type: String, required: [true, "Should be exact"] },
  },
});

// module.exports = mongoose.model('Product', productSchema)
var Product = mongoose.model("Product", productSchema);
module.exports = Product;

productSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});