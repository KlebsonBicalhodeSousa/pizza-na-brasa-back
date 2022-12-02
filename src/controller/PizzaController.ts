import { Request, Response } from "express";
import { PizzaBusiness } from "../business/PizzaBusiness";
import { BaseError } from "../errors/BaseError";
import { IDeletePizzaInputDTO, IIngredientsCurrentInputDTO, IInsertPizzaCurrentInputDTO, IInsertPizzaMenuInputDTO } from "../models/Pizza";

export class PizzaController {
    constructor(
        private pizzaBusiness: PizzaBusiness
    ) {}

    public insertIngredientsCurrent = async (req: Request, res: Response) => {
        try {
            const input: IIngredientsCurrentInputDTO = {
                ingredientName: req.body.ingredientName,
                token: req.headers.authorization as string
            }

            const response = await this.pizzaBusiness.insertIngredientsCurrent(input)
            res.status(201).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao inserir pizza" })
        }
    }

    // Inserir pizzas disponíveis para venda

    public insertPizzaCurrent = async (req: Request, res: Response) => {
        try {
            const input: IInsertPizzaCurrentInputDTO = {
                name: req.body.name,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                token: req.headers.authorization as string
            }

            const response = await this.pizzaBusiness.insertPizzaCurrent(input)
            res.status(201).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao inserir pizza" })
        }
    }

    //Inserir pizzas no menu

    public insertPizza = async (req: Request, res: Response) => {
        try {
            const input: IInsertPizzaMenuInputDTO = {
                name: req.body.name,
                price: req.body.price,
                imageUrl: req.body.imageUrl,                
                ingredients: req.body.ingredients,
                token: req.headers.authorization as string
            }

            const response = await this.pizzaBusiness.insertPizza(input)
            res.status(201).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao inserir pizza" })
        }
    }

    // Ingredientes do estoque do Administrador
    
    public getIngredients = async (req: Request, res: Response) => {
        try {

            const response = await this.pizzaBusiness.getIngredients()
            res.status(200).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar Ingredientes no estoque" })
        }
    }

    // Pizza do estoque do Administrador
    
    public getPizzas = async (req: Request, res: Response) => {
        try {

            const response = await this.pizzaBusiness.getPizzas()
            res.status(200).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar pizzas no estoque" })
        }
    }

    // Pizzas do menu

    public getPizzasMenu = async (req: Request, res: Response) => {
        try {
            // const token = req.headers.authorization as string

            const response = await this.pizzaBusiness.getPizzasMenu()
            res.status(200).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar pizzas" })
        }
    }


    public deletePizza = async (req: Request, res: Response) => {
        try {
            const input: IDeletePizzaInputDTO = {
                name: req.body.name
            }

            const response = await this.pizzaBusiness.deletePizza(input)
            res.status(201).send(response)
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao deletar pizza" })
        }
    }
}