import { BcryptProvider } from "../../Providers/Implementations/BcryptProvider";
import { MongoRepository } from "../../Repositories/Implementations/MongoRepository";
import AuthorizeUserController from "./AuthorizeUserController";
import { AuthorizeUserUseCase } from "./AuthorizeUserUseCase";

const mongoRepository = new MongoRepository()

const bcrytProvider = new BcryptProvider(
    mongoRepository
)

const authorizeUserUseCase = new AuthorizeUserUseCase(
    mongoRepository,
    bcrytProvider
)

const authorizeUserController = new AuthorizeUserController(
    authorizeUserUseCase
)

export { authorizeUserController, authorizeUserUseCase }