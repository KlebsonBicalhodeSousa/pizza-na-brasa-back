import { Request, Response } from "express";
import { OrderBusiness } from "../business/OrderBusiness";
import { BaseError } from "../errors/BaseError";
import { ICreateOrderInputDTO, IGetOrderInputDTO } from "../models/Order";

export class OrderController {
    constructor(
        private orderBusiness: OrderBusiness
    ) {}

    public createOrder = async (req: Request, res: Response) => {
        try {
            const input: ICreateOrderInputDTO = {
                token: req.headers.authorization as string,
                pizzas: req.body.pizzas,
                paymentMethod: req.body.paymentMethod
            }

            const response = await this.orderBusiness.createOrder(input)
            res.status(201).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao criar pedido" })
        }
    }

    public getOrders = async (req: Request, res: Response) => {
        try {

            const input: IGetOrderInputDTO = {
                token: req.headers.authorization as string
            }
            
            const response = await this.orderBusiness.getOrders(input)
            res.status(200).send(response)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado ao buscar ordem" })
        }
    }

    
}