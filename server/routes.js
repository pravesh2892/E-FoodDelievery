/**
 * Created by Academy
 */
 var multiparty = require("connect-multiparty");
 var multipartyMiddleware = multiparty();
 var UserController = require("./controllers/UserController");
 var ProductController = require("./controllers/ProductController");
 const express = require("express");
 const router = express.Router();
 var mongoose = require("mongoose");
 
 const multer = require("multer");
 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, "./public/images/Product");
   },
   filename: function (req, file, cb) {
     var myId = mongoose.Types.ObjectId();
     cb(null, myId + "_Product." + file.mimetype.split("/")[1]);
   },
 });
 
 const upload = multer({ storage: storage });
 module.exports = function (app) {
   app.all("/", function (req, res) {
     var __dirname = "./public/pages/new/";
     res.sendFile("index.html", { root: __dirname });
   });
 
   app.all("/home/", function (req, res) {
     var __dirname = "./public/pages/";
     res.sendFile("index.html", { root: __dirname });
   });
 
   //Product routes
   app.post("/product/", upload.single("productImg"),ProductController.newProduct);
   app.get("/products/", ProductController.getAllProduct);
   app.get("/product/:id/image", ProductController.fetchProductImg);
   app.post("/checkout/", upload.none(), ProductController.saveOrder);
 
   //Add the routes for the
   //rest apis you created in the controllers
 };
 