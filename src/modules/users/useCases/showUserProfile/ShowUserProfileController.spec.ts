import { app } from "../../../../app";
import request from "supertest";

describe("User Profile ( Controller )", () => {
    it("should view user profile", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "profile@.com",
            password: "1234"
          });

        const { token } = responseToken.body;
        request(app)
        .get("/api/v1/profile")
        .send({
            email: "profile@.com",
            password: "1234",
            token: token
        })
        .expect(201).write("Result");
    });
});