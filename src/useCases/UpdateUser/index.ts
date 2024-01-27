import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { MongoRepository } from "../../Repositories/Implementations/MongoRepository";

const mongoRepository = new MongoRepository()
const updateUserUseCase = new UpdateUserUseCase(
    mongoRepository
)
const updateUserController = new UpdateUserController(
    updateUserUseCase
)

export { updateUserController, updateUserUseCase }