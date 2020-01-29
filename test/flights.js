//process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Flights", () => {
  beforeEach(done => {
    //Before each test we empty the database
    // Book.remove({}, (err) => {
    //    done();
    // });
    done();
  });

  /*
   * Test the /POST route
   */
  describe("/POST api/get/flights", () => {
    it("it should get all the flights", done => {
      let filter = {
        land: false,
        reused: false,
        with: false
      };
      chai
        .request(app)
        .post("/api/get/flights")
        .send(filter)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("flights");
          //res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
  });
});
