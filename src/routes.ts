import { createUserController } from "./useCases/CreateUser";
import { authorizeUserController } from "./useCases/AuthorizeUser";
import { getUserController, getUserUseCase } from "./useCases/GetUser";
import { Router } from "express";
import { updateUserController } from "./useCases/UpdateUser";
const router = Router()

router.post('/register', async (req, res) => {
 return createUserController.handle(res, req)
})

router.post('/login', async (req, res) => {
 return authorizeUserController.handle(res, req);
})

router.post('/user', async (req, res) => {
    return getUserController.handle(req, res);
})

router.post('/updateUser', async (req, res) => {
    return updateUserController.handle(req, res);
})

export default router