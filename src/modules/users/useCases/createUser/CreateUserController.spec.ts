import { app } from "../../../../app";
import request from "supertest";

describe("Create User ( Controller )", () => {
    it("should be able return response 201", async () => {
         request(app)
        .post("/api/v1/users")
        .send({
            name: "goguins",
            email: "goguins@.com",
            password: "1221"
        })
        .expect(201).write("Created")
    });
});