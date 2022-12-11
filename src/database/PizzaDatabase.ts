import { IIngredientsDB, IPizzaDB, IPizzasIngredientsDB, Pizza } from "../models/Pizza"
import { BaseDatabase } from "./BaseDatabase"

export class PizzaDatabase extends BaseDatabase {
    public static TABLE_PIZZAS = "Amb2_Pizzas"
    public static TABLE_INGREDIENTS = "Amb2_Ingredients"
    public static TABLE_PIZZAS_INGREDIENTS = "Amb2_Pizzas_Ingredients"   

    public insertPizza = async (pizza: IPizzaDB): Promise<void> => {
        
        await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .insert(pizza)
    }

    public insertIngredients = async (ingredients: IIngredientsDB): Promise<void> => {
        
        await BaseDatabase
            .connection(PizzaDatabase.TABLE_INGREDIENTS)
            .insert(ingredients)
    }

    public insertPizzaIngredients = async (pizzaIngredients: IPizzasIngredientsDB): Promise<void> => {
        
        await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS_INGREDIENTS)
            .insert(pizzaIngredients)
    }
        

    public getIngredients = async (): Promise<IIngredientsDB[]> => {
        const result: IIngredientsDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_INGREDIENTS)
            .select()
            
        return result
    }
    public getIngredientsName = async (name: string): Promise<IIngredientsDB> => {
        const result: IIngredientsDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_INGREDIENTS)
            .select()
            .where({name})

        return result[0]
    }

    public getPizzas = async (): Promise<IPizzaDB[]> => {
        const result: IPizzaDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .select()

        return result
    }

    public getPizzabyName = async (name: string): Promise<IPizzaDB | undefined> => {
        const result: IPizzaDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .select()
            .where({name})

        return result[0]
    }

    public findIngredientsByName = async (name: string): Promise<IIngredientsDB | undefined> => {
        const result: IIngredientsDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_INGREDIENTS)
            .select()
            .where({name})

        return result[0]
    }

    public getIngredientsPizza = async (pizza_name: string): Promise<string[]> => {
        const result: IPizzasIngredientsDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS_INGREDIENTS)
            .select("ingredient_name")
            .where({pizza_name})

        return result.map(item => item.ingredient_name)
    }

    public getPizzaInPizzasIngredients = async (pizza_name: string): Promise<IPizzasIngredientsDB> => {
        const result: IPizzasIngredientsDB[] = await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS_INGREDIENTS)
            .select()
            .where({pizza_name})

        return result[0]
    }

    public getPizzasFormatted = async (): Promise<any[]> => {
        const result: IPizzaDB[] = await BaseDatabase
            .connection.raw(`SELECT * FROM Amb_Pizzas
            JOIN Amb_Pizzas_Ingredients ON Amb_Pizzas_Ingredients.pizza_name = Amb_Pizzas.name;
            `)

        return result
    }
    public deletePizzaIngredients = async (pizza_name: string): Promise<void> => {
        await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS_INGREDIENTS)
            .delete()
            .where({pizza_name})
            // .andWhere({})
    }
    public deletePizza = async (name: string): Promise<void> => {
        await BaseDatabase
            .connection(PizzaDatabase.TABLE_PIZZAS)
            .delete()
            .where({name})
            // .andWhere({})
    }
}