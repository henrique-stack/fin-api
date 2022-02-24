import "reflect-metadata";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";

let createUserUseCase: CreateUserUseCase;
let createUserInMemory: InMemoryUsersRepository;
describe("Create User ( UseCase )", () => {
    beforeEach(() => {
        createUserInMemory = new InMemoryUsersRepository();	
        createUserUseCase = new CreateUserUseCase(createUserInMemory);
    })
    it("should be able to create user account", async () => {

        const result = await createUserUseCase.execute({
            email: "test@.com",
            name: "test",
            password: "1234"
        });
        expect(result).toHaveProperty("id");
    });
});

