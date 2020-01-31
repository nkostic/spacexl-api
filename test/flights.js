let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("Flights", () => {
  beforeEach(done => {
    done();
  });

  describe("/POST api/get/flights", () => {
    it("It should not fetch results when filters undefined", done => {
      chai
        .request(app)
        .post("/api/get/flights")
        .send()
        .end((err, res) => {
          res.should.have.status(206);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('No Filters Passed!');
          res.body.should.have.property('results');
          res.body.results.should.be.a('array');
          done();
        });
    });
  });

  describe("/POST api/get/flights", () => {
    it("It should not fetch results when filters null", done => {
      const filters = null;
      chai
        .request(app)
        .post("/api/get/flights")
        .send({filters})
        .end((err, res) => {
          res.should.have.status(206);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('No Filters Passed!');
          res.body.should.have.property('results');
          res.body.results.should.be.a('array');
          done();
        });
    });
  });

  describe("/POST api/get/flights", () => {
    it("It should not fetch results without filters.land passed", done => {
      const filters = {
        reused: false,
        with: false
      }
      chai
        .request(app)
        .post("/api/get/flights")
        .send({filters})
        .end((err, res) => {
          res.should.have.status(206);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Filter LAND not passed!');
          res.body.should.have.property('results');
          res.body.results.should.be.a('array');
          done();
        });
    });
  });

  describe("/POST api/get/flights", () => {
    it("It should not fetch results without filters.reused passed", done => {
      const filters = {
        land: false,
        with: false
      }
      chai
        .request(app)
        .post("/api/get/flights")
        .send({filters})
        .end((err, res) => {
          res.should.have.status(206);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Filter REUSED not passed!');
          res.body.should.have.property('results');
          res.body.results.should.be.a('array');
          done();
        });
    });
  });
  
  describe("/POST api/get/flights", () => {
    it("It should not fetch results without filters.with passed", done => {
      const filters = {
        land: false,
        reused: false
      }
      chai
        .request(app)
        .post("/api/get/flights")
        .send({filters})
        .end((err, res) => {
          res.should.have.status(206);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Filter WITH not passed!');
          res.body.should.have.property('results');
          res.body.results.should.be.a('array');
          done();
        });
    });
  });

  describe("/POST api/get/flights", () => {
    it("It should fetch results if filters passed and db is running locally", done => {
      const filters = {
        land: false,
        reused: false,
        with: false
      }
      chai
        .request(app)
        .post("/api/get/flights")
        .send({filters})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Flights Successfully Fetched!');
          res.body.should.have.property('results');
          res.body.results.should.be.a('array');
          done();
        });
    });
  });

});
