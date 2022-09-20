/**
 * Created by Academy
 */
 var Product = require("../models/Product");
 var Order = require("../models/Order");
 var HttpStatus = require("http-status");
 var Validation = require("./Validation");
 const multiparty = require("multiparty");
 var path = require("path");
  
 var mongoose = require("mongoose");
 //use exec to run a shell script for example
 // if you want to create a folder then you can run exec('mkdir folderpath', callback function)
 var exec = require("child_process").exec;
 
 //User node-fs to create files in a given folderr
 var fs = require("node-fs");
 
 //Implement the following functionalities
 //save method to Save a new Product
  const newProduct =  (req, res) => {
    if (req.file != undefined) {
      productImg = {
        fileName: req.file.filename,
        filePath: req.file.path,
        fileType: req.file.mimetype,
      };
    } else {
      productImg = saveProductImg();
    }
    Product.findOne({ name: req.body.name }, (err, data) => {
      if (!data) {
        const newProduct = new Product({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          productImg: productImg,
        });
        newProduct
          .save()
          .then(() => {
            res.status(201).json({
              message: "New Product Saved Successfully",
              newProduct: newProduct,
            });
          })
          .catch((err) => res.json(Validation.validationErrors(err)));
      } else {
        if (err)
          return res.json(`Something went wrong, please try again. ${err}`);
        return res.json(`data already exists`);
      }
    });
  };
  
 //To set a default image for a new product implement and call
 //saveProductImg to Save a default image for it
 //default image: ./public/images/product.png\
 //create a folder in the path ./public/images/Product
 var dir = "./public/images/Product";
 if (!fs.existsSync(dir)) {
   fs.mkdirSync(dir, { recursive: true });
 }
 //in the new folder create the image with
 //filename: _id+"_Product."+imageextension
 const saveProductImg = () => {
   productImg = {
     fileName: "product.png",
     filePath: "public/images/product.png",
     fileType: "png",
   };
   return productImg;
 };
 //eg: if uploaded file is image.jpg for item with _id: abcdefghij
 //then filename: abdefghij_Product.jpg
 
 //list method to List all products in db
 const getAllProduct = (req, res) => {
   Product.find({}, (err, data) => {
     if (err) {
       return res.json({ Error: err });
     }
     return res.json(data);
   });
 };
 
 //fetchProductImg method to Fetch the productImage of a given product
 const fetchProductImg = (req, res) => {
   Product.findOne({ _id: req.params.id }, (err, data) => {
     if (err || !data) {
       return res.json({ message: "Product doesn't exist." });
     } else {
       fs.readFile(data.productImg.filePath, function (err, data) {
         if (err) throw err; // Fail if the file can't be read.
         res.writeHead(200, { "Content-Type": "image/png" });
         res.end(data); // Send the file data to the browser.
       });
       // return res.json(data);
     } //return the tea object if found
   });
 };
 
 //saveProducts method to seed the database with initial data
 
 const saveProducts = () => {
   arr = [
     {
       name: "Mini Tiffin",
       category: "South Indian",
       description:
         "Rava Kesari, mini idly 5pcs, rava kichadi, mini masala dosai",
       price: 399,
     },
 
     {
       name: "Big Boy Burger",
       category: "American",
       description: "Double patty burger with cheese and fries",
       price: 500,
     },
 
     {
       name: "Melanzane Parmagianna",
       category: "Italian",
       description:
         "Baked layers of ,sliced aubergine with fresh basil, mozarella, tomato sauce, sprinkled with parmesan cheese",
       price: 450,
     },
 
     {
       name: "Sebze Kefta Tagine",
       category: "Mediterranean",
       description:
         "Cottage cheese mince with garlic, fresh coriander and parsley, cinnamon is rolled into balls and cooked in a tomato and onion sauce",
       price: 532,
     },
   ];
 
   arr.forEach(function (item, req, res) {
     productImg = saveProductImg();
     Product.findOne({ name: item.name }, (err, data) => {
       if (!data) {
         try {
           const newProd = new Product({
             name: item.name,
             description: item.description,
             price: item.price,
             category: item.category,
             productImg: productImg,
           });
           newProd.save();
         } catch (err) {
           console.log(err);
         }
       }
     });
   });
 };
 
 //Implemenet the saveOrder method here
 //Include the Order Schema into this controller
 //Save the incoming order to the Order collection
 const saveOrder = async (req, res) => {
  var saveOrder = new Order({
    item:[{
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    }],
    checkOutDetails:[{
      Name:req.body.Name,
      Address:{
        line1:req.body.line1,
        country:req.body.country,
        state:req.body.state,
        pinCode:req.body.pinCode
      }
    }]
    
  });
  saveOrder
    .save()
    .then(() => {
      res.status(201).json({
        message: "Order Saved Successfully",
        saveOrder: saveOrder,
      });
    })
    .catch((err) => res.json(Validation.validationErrors(err)));
};
 
 module.exports = {
   saveProducts,
   newProduct,
   saveOrder,
   saveProductImg,
   fetchProductImg,
   getAllProduct,
 };
 