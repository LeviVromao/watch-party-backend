import { CreateUserCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
import { MongoRepository } from "../../Repositories/Implementations/MongoRepository";
import { BcryptProvider } from "../../Providers/Implementations/BcryptProvider";

const mongoRepository = new MongoRepository()
const bcryptProvider = new BcryptProvider(
    mongoRepository
)

const createUserUseCase = new CreateUserCase(
    mongoRepository,
    bcryptProvider
)


const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserController, createUserUseCase }