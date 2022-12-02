import { Router } from 'express'
import { PizzaBusiness } from '../business/PizzaBusiness'
import { PizzaController } from '../controller/PizzaController'
import { PizzaDatabase } from '../database/PizzaDatabase'
import { UserDatabase } from '../database/UserDatabase'
import { Authenticator } from '../services/Authenticator'
import { IdGenerator } from '../services/IdGenerator'

export const pizzaRouter = Router()

const pizzaController = new PizzaController(
    new PizzaBusiness(
        new PizzaDatabase(),
        new UserDatabase,
        new Authenticator()
    )
)

pizzaRouter.get("/", pizzaController.getPizzas)
pizzaRouter.get("/ingredients", pizzaController.getIngredients)
pizzaRouter.get("/menu", pizzaController.getPizzasMenu)

pizzaRouter.post("/insert", pizzaController.insertPizzaCurrent)
pizzaRouter.post("/insert-ingredinets", pizzaController.insertIngredientsCurrent)
pizzaRouter.post("/insert-menu", pizzaController.insertPizza)
pizzaRouter.delete("/delete", pizzaController.deletePizza)