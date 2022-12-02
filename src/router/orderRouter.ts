import { Router } from 'express'
import { OrderBusiness } from '../business/OrderBusiness'
import { OrderController } from '../controller/OrderController'
import { OrderDatabase } from '../database/OrderDatabase'
import { UserDatabase } from '../database/UserDatabase'
import { Authenticator } from '../services/Authenticator'
import { IdGenerator } from '../services/IdGenerator'

export const orderRouter = Router()

const orderController = new OrderController(
    new OrderBusiness(
        new OrderDatabase(),
        new UserDatabase(),
        new Authenticator(),
        new IdGenerator()
    )
)

orderRouter.post("/create", orderController.createOrder)
orderRouter.get("/", orderController.getOrders)