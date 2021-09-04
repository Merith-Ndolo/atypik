process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../server");
const db = require("../config/db");
require("@testing-library/dom");

describe("Posts tests", () => {
  beforeAll(() => {
    db.conn();
  });

  afterAll(() => {
    db.close();
  });

  it("Ok, creating new post work", () => {
    return request(app)
      .post("/api/post")
      .send({
        role: "propriétaire",
        posterId: "6070e59f2590b3213877e32d",
        file: "12345678.jpg",
        message: "Home",
        titre: "titre",
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it("OK, reading all Posts works ", () => {
    return request(app)
      .get("/api/post")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("OK, deleting post works ", () => {
    return request(app)
      .delete("/api/post/6097cc3ddf478a4a043999c7")
      .send({
        _id: "6097cc3ddf478a4a043999c7",
        role: "administrateur",
      })
      .expect(200);
  });

  it("OK, commenting a post works ", () => {
    return request(app)
      .patch("/api/post/comment-post/6097cc3ddf478a4a043999c7")
      .send({
        commenterId: "6070e59f2590b3213877e32d",
        commenterPseudo: "Merith",
        text: "hey text",
      })
      .expect(200);
  });

  it("OK, making a reservation works ", () => {
    return request(app)
      .patch("/api/post/reserve-habitat/6097cc3ddf478a4a043999c7")
      .send({
        reservationId: "6070f27f529a8a33e096b9f9",
        personPseudo: "Mabi",
        role: "client",
        paiement: "100",
        date_open: Date.now(),
        date_close: Date.now() + 1,
        timestamp: new Date().getTime(),
      })
      .expect(200);
  });
});
