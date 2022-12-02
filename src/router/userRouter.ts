import { Router } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../database/UserDatabase"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"


export const userRouter = Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new Authenticator(),
        new HashManager(),
        new IdGenerator()
    )
)

userRouter.post("/signup", userController.signup)
userRouter.get("/address", userController.getAddress)
userRouter.put("/address", userController.address)
userRouter.post("/login", userController.login)
userRouter.get("/", userController.getUser)
userRouter.put("/", userController.updateUser)