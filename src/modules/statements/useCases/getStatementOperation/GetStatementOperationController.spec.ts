import { app } from "../../../../app";
import request from "supertest";

describe("GET /api/v1/statements/:statement_id", () => {
  it("should be able receive a JWT token for header and id from an operation registed", async () => {
      const responseToken = await request(app)
      .get("/api/v1/statements/:statement_id")

      const { token } = responseToken.header;

      const data = responseToken.body;
      const response = request(app)
      .get("/api/v1/statements/:statement_id")
      .send({
          data
      })
      .set({
          Authorization: `bearer: ${token}`
      });

      expect(response);
  })
})