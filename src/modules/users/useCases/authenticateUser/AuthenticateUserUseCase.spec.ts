import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "../createUser/CreateUserError";

let createUserUseCase: CreateUserUseCase;
let createUserInMemory: InMemoryUsersRepository;
let UserError: CreateUserError;
describe("Authenticate User", () => {
    beforeEach(() => {
        UserError = new CreateUserError();
        createUserInMemory = new InMemoryUsersRepository();	
        createUserUseCase = new CreateUserUseCase(createUserInMemory);
    })

    it("should return data from user and token this user", async () => {
        const result = await createUserUseCase.execute({
            email: "test@.com",
            name: "test",
            password: "1234"
        });
        expect(UserError)
    });
});