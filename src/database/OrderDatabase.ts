import { IOrderDB, IOrderItemDB } from "../models/Order"
import { BaseDatabase } from "./BaseDatabase"
import { PizzaDatabase } from "./PizzaDatabase"

export class OrderDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "Amb2_Orders"
    public static TABLE_ORDER_ITEMS= "Amb2_Order_Items"

    public createOrder = async (newOrder: IOrderDB ): Promise<void> => {
        await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDERS)
            .insert(newOrder)
    }

    public insertItemOnOrder = async (orderItem: IOrderItemDB): Promise<void> => {
        await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDER_ITEMS)
            .insert(orderItem)
    }

    public getPrice = async (pizzaName: string): Promise<number | undefined> => {
        const result: any[] = await BaseDatabase
        .connection(PizzaDatabase.TABLE_PIZZAS)
        .select("price")
        .where({name: pizzaName})

        return result[0].price as number
    }

    public getAllOrders = async (): Promise<IOrderDB[]> => {
        const result: IOrderDB[] = await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDERS)
            .select()

        return result
    }

    public getOrders = async (id: string): Promise<IOrderDB> => {
        const result: IOrderDB[] = await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDERS)
            .select()
            .where({id})

        return result[0]
    }

    public getOrdersById = async (user_id: string): Promise<IOrderDB[]> => {
        const result: IOrderDB[] = await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDERS)
            .select()
            .where({user_id})

        return result
    }

    public getOrderItem = async (orderId: string): Promise<IOrderItemDB[]> => {
        const result: IOrderItemDB[] = await BaseDatabase
            .connection(OrderDatabase.TABLE_ORDER_ITEMS)
            .select()
            .where({order_id: orderId})

        return result
    }

}