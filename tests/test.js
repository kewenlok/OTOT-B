const chai = require("chai");
const chaiHttp = require("chai-http");
const Task = require("../models/task");
const app = require("../server");

chai.use(chaiHttp);
chai.should();

describe("Tasks", () => {
  const task_name = "Test task name";
  const is_completed = false;
  let task_id;
  beforeEach((done) => {
    Task.create({task_name, is_completed}).then((res) => {
      task_id = res._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
      done();
    });
  });
  afterEach((done) => {
    Task.findOneAndDelete({ _id: task_id }, (res) => {
      done();
    });
  })

  describe("GET /api/task/all", () => {
    it("should get all task records", (done) => {
      chai.request(app)
        .get('/api/task/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.lengthOf(1);
          done();
        });
    });
  });
  describe("POST /api/task/add", () => {
    it("should add a task record", (done) => {
      chai.request(app)
        .post('/api/task/add')
        .send({ task_name, is_completed })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    after((done) => {
      Task.deleteMany({}, (res) => {
        done();
      });
    })
  });
  describe("PUT /api/task/update", () => {
    it("should update a task completion status", (done) => {
      chai.request(app)
        .put('/api/task/update')
        .send({ task_id, is_completed: true })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('is_completed').that.equal(true);
          done();
        });
    });
  });
  describe("DELETE /api/task/delete", () => {
    it("should delete a task record", (done) => {
      chai.request(app)
        .delete('/api/task/delete')
        .send({ task_id })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});