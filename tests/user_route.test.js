process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../server");
const db = require("../config/db");
require("@testing-library/dom");

describe("Users tests", () => {
  beforeAll(() => {
    db.conn();
  });

  afterAll(() => {
    db.close();
  });

  it("Ok, creating user work", () => {
    return request(app)
      .post("/api/user/register")
      .send({
        pseudo: "jean",
        email: "jean@gmail.com",
        tel: "012536485",
        password: "123456789",
        role: "client",
      })
      .expect(302);
  });

  it("OK, connexion work", () => {
    return request(app)
      .post("/api/user/login")
      .send({
        email: "jean@gmail.com",
        password: "123456789",
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("OK, getting all users works ", () => {
    return request(app)
      .get("/api/user")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("OK, getting one user works ", () => {
    return request(app)
      .get("/api/user/6076f6dce7636f0022fe21fa")
      .send({ _id: "6076f6dce7636f0022fe21fa" })
      .expect(200);
  });

  it("OK, deleting user works ", () => {
    return request(app)
      .delete("/api/user/6075db9fce6f0e00224dfb68")
      .send({
        _id: "6075db9fce6f0e00224dfb68",
        role: "administrateur",
      })
      .expect(200);
  });
  /*
    it('OK, make payment works ', () => {
        return request(app).post('/api/user/payment')
        .send({ 
           post: '6097cc3ddf478a4a043999c7',
           token: '12345678'
        })
        .expect(200)
        }
    );*/
});
