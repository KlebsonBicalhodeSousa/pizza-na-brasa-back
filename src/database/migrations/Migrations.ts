import { BaseDatabase } from "../BaseDatabase";
import { OrderDatabase } from "../OrderDatabase";
import { PizzaDatabase } from "../PizzaDatabase";
import { UserDatabase } from "../UserDatabase";
import { address, ingredientsSeed, pizzasIngredientsSeed, pizzasSeed, users } from "./data";

class Migrations extends BaseDatabase {
  execute = async () => {
    try {
      console.log("Creating tables...");
      await this.createTables();
      console.log("Tables created successfully.");

      console.log("Populating tables...");
      await this.insertData();
      console.log("Tables populated successfully.");

      console.log("Migrations completed.");
    } catch (error) {
      console.log("FAILED! Error in migrations...");
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      console.log("Ending connection...");
      BaseDatabase.connection.destroy();
      console.log("Connection closed graciously.");
    }
  };

  createTables = async () => {
    await BaseDatabase.connection.raw(`
    DROP TABLE IF EXISTS ${OrderDatabase.TABLE_ORDER_ITEMS};
    DROP TABLE IF EXISTS ${OrderDatabase.TABLE_ORDERS};
    DROP TABLE IF EXISTS ${UserDatabase.TABLE_ADDRESS};
    DROP TABLE IF EXISTS ${UserDatabase.TABLE_USERS};
    DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_PIZZAS_INGREDIENTS};
    DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_INGREDIENTS};
    DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_PIZZAS};

    CREATE TABLE IF NOT EXISTS ${UserDatabase.TABLE_USERS} (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255)NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        cpf VARCHAR(14) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL" NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ${UserDatabase.TABLE_ADDRESS} (
      user_id VARCHAR(255) PRIMARY KEY,
        street VARCHAR(255) NOT NULL,
        number VARCHAR(255) NOT NULL,
        neighbourhood VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        complement VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES Amb2_User (id)
    );
    
    CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_PIZZAS} (
        name VARCHAR(255) PRIMARY KEY,
        price float NOT NULL,
        image_url VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_INGREDIENTS} (
        name VARCHAR(255) PRIMARY KEY
    );
    
    CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_PIZZAS_INGREDIENTS} (
        pizza_name VARCHAR(255) NOT NULL,
        ingredient_name VARCHAR(255) NOT NULL,
        FOREIGN KEY (pizza_name) REFERENCES Amb2_Pizzas (name),
        FOREIGN KEY (ingredient_name) REFERENCES Amb2_Ingredients (name)
    );
    
    CREATE TABLE IF NOT EXISTS ${OrderDatabase.TABLE_ORDERS} (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        paymentMethod VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES Amb2_User (id)
    );
    
    CREATE TABLE IF NOT EXISTS ${OrderDatabase.TABLE_ORDER_ITEMS} (
        id VARCHAR(255) PRIMARY KEY,
        pizza_name VARCHAR(255) NOT NULL,
        quantity TINYINT,
        order_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (pizza_name) REFERENCES Amb2_Pizzas (name),
        FOREIGN KEY (order_id) REFERENCES Amb2_Orders (id)
    );
    `);
  };

  insertData = async () => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(
      users
    );
    await BaseDatabase.connection(UserDatabase.TABLE_ADDRESS).insert(
      address
    );
    await BaseDatabase.connection(PizzaDatabase.TABLE_PIZZAS).insert(
      pizzasSeed
    );

    await BaseDatabase.connection(PizzaDatabase.TABLE_INGREDIENTS).insert(
      ingredientsSeed
    );

    await BaseDatabase.connection(
      PizzaDatabase.TABLE_PIZZAS_INGREDIENTS
    ).insert(pizzasIngredientsSeed);
  };
}

const migrations = new Migrations();
migrations.execute();
