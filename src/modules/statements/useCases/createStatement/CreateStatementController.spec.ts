import request from "supertest";
import { app } from "../../../../app";
describe("Statement ( Controller )", () => {
    it("should be able list all operations from user", async () => {
        let operations =[
            -34.44,
             45.32,
            -23.45,
            -12.32,
             90.00
        ];

        let balance = 0;
        for(let i = 0; i < operations.length; i++) {
            balance +=operations[i];
        };

        const user = await request(app)
        .get("/api/v1/users");
        const { token } = user.header;

        const response = await request(app)
        .get("/api/v1/statements/balance")
        .set({
            operations,
            balance: balance
        });
        expect(response);
    }); 

    it("should be able to register operation", async () => {

        const response = await request(app)
        .post("/api/v1/statements/withdraw")
        .send({
            amount: 21.3,
            description: "camisa personalizada"
        })
        expect(response)
    });
});