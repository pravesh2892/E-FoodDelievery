const {
  saveProducts,
  newProduct,
  saveOrder,
  saveProductImg,
  fetchProductImg,
  getAllProduct,
} = require("../server/controllers/ProductController");

const Product = require("../server/models/Product");
const chai = require("chai");
const mongoose = require("mongoose");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const chaiHttp = require("chai-http");
const routes = require("../server/routes");

const expect = chai.expect;
const assert = require("chai").assert;
chai.use(sinonChai);

describe("productController", () => {
  const sandbox = sinon.createSandbox();
  afterEach(function () {
    sinon.restore();
    sandbox.restore();
  });

  describe("saveProducts", () => {
    it("it should call mongoose.model findOne method 4 times", async () => {
      const findOneMock = sandbox.stub(Product, "findOne");
      await saveProducts();
      expect(findOneMock.callCount).to.equal(4);
    });
  });

  describe("newProduct", () => {
    afterEach(function () {
      sinon.restore();
      sandbox.restore();
    });

    it("it should call once", async () => {
      const findOneMock = sandbox.stub(Product, "findOne").resolves(undefined);
      const req = { file: "file", body: { name: "name" } };
      await newProduct(req);
      expect(findOneMock.calledOnce);
    });

    it(" save should call once", async () => {
      const saveMock = sandbox
        .stub(Product.prototype, "save")
        .resolves(undefined);
      const req = { file: "file", body: { name: "name" } };
      await newProduct(req);
      expect(saveMock.calledOnce);
    });
  });
  
  describe("saveOrder", () => {});

  describe("saveProductImg", () => {
    it("it should return image details", () => {
      var productImg = saveProductImg();
      assert.equal(productImg.fileName, "product.png");
      assert.equal(productImg.filePath, "public/images/product.png");
      assert.equal(productImg.fileType, "png");
    });
  });

  describe("fetchProductImg", () => {});

  describe("getAllProduct", () => {});
});
