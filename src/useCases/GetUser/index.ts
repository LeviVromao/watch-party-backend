import { GetUserController } from "./GetUserController";
import { GetUserUseCase } from "./GetUserUseCase";
import { MongoRepository } from "../../Repositories/Implementations/MongoRepository";
import { BcryptProvider } from "../../Providers/Implementations/BcryptProvider";

const mongoRepository = new MongoRepository()
const bcryptProvider = new BcryptProvider(
    mongoRepository
)

const getUserUseCase = new GetUserUseCase(
    mongoRepository,
    bcryptProvider
)

const getUserController = new GetUserController(
    getUserUseCase
)

export { getUserController, getUserUseCase }