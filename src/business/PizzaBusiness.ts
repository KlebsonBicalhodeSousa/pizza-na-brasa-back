import { PizzaDatabase } from "../database/PizzaDatabase";
import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";
import { ParamsError } from "../errors/ParamsError";
import { IdGenerator } from "../services/IdGenerator";
import {
  IDeletePizzaInputDTO,
  IGetPizzasMenuOutputDTO,
  IGetPizzasOutputDTO,
  IIngredientsCurrentInputDTO,
  IIngredientsDB,
  IIngredientsOutputDTO,
  IInsertPizzaCurrentInputDTO,
  IInsertPizzaMenuInputDTO,
  IPizzaDB,
  IPizzasIngredientsDB,
  Pizza,
} from "../models/Pizza";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../database/UserDatabase";
import { USER_ROLES } from "../models/User";

export class PizzaBusiness {
  constructor(
    private pizzaDatabase: PizzaDatabase,
    private userDatabase: UserDatabase,
    private authenticator: Authenticator
  ) {}

  //Inserir pizza disponível

  public insertIngredientsCurrent = async (
    input: IIngredientsCurrentInputDTO
  ) => {
    const { ingredientName, token } = input;

    if (!ingredientName) {
      throw new ParamsError("Insira ao menos 1 ingrediente!");
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new ParamsError("Token inválido!");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new ConflictError(
        "Somente administradores podem adicionar ingredientes!"
      );
    }

    const ingredientDB = await this.pizzaDatabase.getIngredientsName(
      ingredientName
    );

    if (ingredientDB) {
      throw new ConflictError("Este ingrediente já existe!");
    }

    const ingredientsDB: IIngredientsDB = {
      name: ingredientName,
    };

    await this.pizzaDatabase.insertIngredients(ingredientsDB);

    return { message: "Ingrediente inserido com sucesso!" };
  };

  // Inserir pizzas disponíveis

  public insertPizzaCurrent = async (input: IInsertPizzaCurrentInputDTO) => {
    const { name, price, imageUrl, token } = input;

    if (!name || !price || !imageUrl) {
      throw new ParamsError("Preencha todos os campos!");
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new ParamsError("Token inválido!");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new ConflictError(
        "Somente administradores podem adicionar pizzas!"
      );
    }

    const pizzaDB = await this.pizzaDatabase.getPizzabyName(name);

    if (pizzaDB) {
      throw new ConflictError("Esta pizza já existe!");
    }

    const pizza: IPizzaDB = {
      name,
      price,
      image_url: imageUrl,
    };

    await this.pizzaDatabase.insertPizza(pizza);

    return { message: "Pizza inserida com sucesso!" };
  };

  // Inserir pizzas no menu

  public insertPizza = async (input: IInsertPizzaMenuInputDTO) => {
    const { name, price, imageUrl, ingredients, token } = input;

    if (!name || !price || !imageUrl || !ingredients) {
      throw new ParamsError("Preencha todos os campos!");
    }

    if (ingredients.length <= 0) {
      throw new ParamsError("Insira ao menos um ingrediente");
    }

    const pizzaMeu = await this.pizzaDatabase.getPizzaInPizzasIngredients(name);

    if (pizzaMeu) {
      throw new ConflictError("Pizza já inserida no menu");
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new ParamsError("Token inválido!");
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new ConflictError(
        "Somente administradores podem adicionar pizzas!"
      );
    }

    const pizzaDB = await this.pizzaDatabase.getPizzabyName(name);

    if (!pizzaDB) {
      throw new NotFoundError("Esta pizza não existe no cardápio!");
    }

    const pizza: IPizzaDB = {
      name,
      price,
      image_url: imageUrl,
    };

    for (let ingredient of ingredients) {
      const ingredientsExist = await this.pizzaDatabase.findIngredientsByName(
        ingredient.name
      );

      if (ingredientsExist) {
        const pizzaIngredients: IPizzasIngredientsDB = {
          pizza_name: pizza.name,
          ingredient_name: ingredient.name,
        };
        await this.pizzaDatabase.insertPizzaIngredients(pizzaIngredients);
      } else {
        const ingredientsDB = {
          name: ingredient.name,
        };
        await this.pizzaDatabase.insertIngredients(ingredientsDB);
        const pizzaIngredients: IPizzasIngredientsDB = {
          pizza_name: pizza.name,
          ingredient_name: ingredient.name,
        };
        await this.pizzaDatabase.insertPizzaIngredients(pizzaIngredients);
      }
    }

    return { message: "Pizza inserida no menu com sucesso!" };
  };

  // Ingredientes do estoque do Administrador

  public getIngredients = async () => {
    
    const ingredientsDB = await this.pizzaDatabase.getIngredients();

    return ingredientsDB;
  };

  // Pizza do estoque do Administrador

  public getPizzas = async () => {

    const pizzasDB = await this.pizzaDatabase.getPizzas();

    const response: IGetPizzasOutputDTO = {
      message: "Pizzas retornadas com sucesso!",
      pizzas: pizzasDB.map((pizza) => ({
        name: pizza.name,
        price: pizza.price,
        imageUrl: pizza.image_url,
      })),
    };

    return response;
  };
  // Pizzas do cardápio

  public getPizzasMenu = async (): Promise<IGetPizzasMenuOutputDTO> => {
    const pizzasDB = await this.pizzaDatabase.getPizzas();

    const pizzas: Pizza[] = [];

    for (let pizzaDB of pizzasDB) {
      const pizza = new Pizza(
        pizzaDB.name,
        pizzaDB.price,
        pizzaDB.image_url,
        []
      );
      const ingredients = await this.pizzaDatabase.getIngredientsPizza(
        pizzaDB.name
      );

      if (ingredients.length > 0) {
        pizza.setIngredients(ingredients);

        pizzas.push(pizza);
      }
    }

    const response: IGetPizzasMenuOutputDTO = {
      message: "Pizzas retornadas com sucesso!",
      pizzas: pizzas.map((pizza) => ({
        name: pizza.getName(),
        price: pizza.getprice(),
        imageUrl: pizza.getImageUrl(),
        ingredients: pizza.getIngredients(),
      })),
    };

    return response;
  };

  public deletePizza = async (input: IDeletePizzaInputDTO) => {
    const { name } = input;
    
    const pizzaDB = await this.pizzaDatabase.getPizzabyName(name);

    if (!pizzaDB) {
      throw new NotFoundError("Pizza não encontrada!");
    }

    await this.pizzaDatabase.deletePizzaIngredients(name);
    await this.pizzaDatabase.deletePizza(name);

    const response = {
      message: "Pizza deletada com sucesso!",
    };

    return response;
  };
}
