'use strict';

var Promise = require('bluebird');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai)

var Apples = require("../db/models/apple")

describe('The `Apple` model', function () {
    before(function () {
      return db.sync({force: true});
    });

    //populate before specs
var apple;
beforeEach(function(){
    apple = Apple.build({
       name: 'Gala',
       price: 1,
       description: "A great apple",
       stock: 20,
       category: 'green'
    });
});

//delete after spec

afterEach(function(){
    return Promise.all([
        Apple.truncate({cascade: true})
    ]);
});

describe('it decrements stock', function (){
    it("decrements stock", function(){
        return apple.save()
        .then(function (apple){
            expect(apple.stock).to.equal(19)
        });
    });
});
