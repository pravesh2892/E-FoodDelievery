const validationErrors = require("../server/controllers/Validation");
const chai = require("chai");

const expect = chai.expect;


describe('validationErrors ',()=>{
    it('should do nothing',()=>{
        var validations = validationErrors();
    expect(typeof(validations).to.be('function'));
    });

});