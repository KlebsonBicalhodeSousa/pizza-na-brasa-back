import { IAddressDB } from "../../models/Address";
import {
  IIngredientsDB,
  IPizzaDB,
  IPizzasIngredientsDB,
} from "../../models/Pizza";
import { IUserDB, USER_ROLES } from "../../models/User";

export const users: IUserDB[] = [
  {
    id: "101",
    name: "Astrodev",
    email: "astrodev@gmail.com",
    cpf: "000.000.000-00",
    password: "$2a$10$WWzHRIFs787IQ3XufgTSret2HxTru0xyaYulqBrTr7D4qYdHqn6I.", // 123456
    role: USER_ROLES.ADMIN,
  },
  {
    id: "102",
    name: "Fulano",
    email: "fulano@gmail.com",
    cpf: "111.111.111-11",
    password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO", // qwerty00
    role: USER_ROLES.NORMAL,
  },
];

export const address: IAddressDB[] = [
  {
    user_id: "102",
    street: "R. Afonso Braz",
    number: "177",
    neighbourhood: "Vila N. Conceição",
    city: "São Paulo",
    state: "SP",
    complement: "72",
  },
];

export const pizzasSeed: IPizzaDB[] = [
  {
    name: "Margherita",
    price: 28.9,
    image_url: "https://i.postimg.cc/52gr541C/marguerita.jpg",
  },
  {
    name: "Bufala",
    price: 30.9,
    image_url: "https://i.postimg.cc/HnCxw443/pizza-Bufala2.jpg",
  },
  {
    name: "Romana",
    price: 25.9,
    image_url: "https://i.postimg.cc/SK2NHtgD/Romana.jpg",
  },
  {
    name: "Diavola",
    price: 23.8,
    image_url: "https://i.postimg.cc/mg1v4fGz/pizza-Diavola.jpg",
  },
  {
    name: "4 queijos",
    price: 22.5,
    image_url: "https://i.postimg.cc/kGwS1p5f/pizza4-Queijos2.jpg",
  },
  {
    name: "Bianca",
    price: 22.2,
    image_url: "https://i.postimg.cc/CLztCT5P/pizza-Bianca2.jpg",
  },
  {
    name: "Portuguesa",
    price: 25.8,
    image_url: "https://i.postimg.cc/L8Pb7tzj/pizza-Portuguesa.jpg",
  },
  {
    name: "Calabreza",
    price: 25.8,
    image_url: "https://i.postimg.cc/ydLQ9vHC/pizza-Calabreza2.jpg",
  },
  {
    name: "Alla Moda",
    price: 23.5,
    image_url: "https://i.postimg.cc/wxb4jf2h/pizza-Alla-Moda.jpg",
  },
  // {
  //   "name": "Pizza Bolo",
  //   "price": 23.5,
  //   "image_url": "https://i.postimg.cc/Vk1pjhWZ/pizza-bolo.jpg"
  // },
  // {
  //   "name": "Brigadeiro",
  //   "price": 24.90,
  //   "imageUrl": "https://i.postimg.cc/bYG9NCCp/pizza-Brigadeiro1.jpg"
  // }
];

export const ingredientsSeed: IIngredientsDB[] = [
  {
    name: "tomato",
  },
  {
    name: "mozzarella",
  },
  {
    name: "mozarella di bufala",
  },
  {
    name: "anchovies",
  },
  {
    name: "oregano",
  },
  {
    name: "oil",
  },
  {
    name: "spicy-salami",
  },
  {
    name: "ovo cozido",
  },
  {
    name: "gorgonzola",
  },
  {
    name: "parmesão",
  },
  {
    name: "azeitonas",
  },
  {
    name: "calabresa",
  },
  {
    name: "salaminho Italiano",
  },
  {
    name: "presunto",
  },
  {
    name: "provolone",
  },
];

export const pizzasIngredientsSeed: IPizzasIngredientsDB[] = [
  {
    pizza_name: "Margherita",
    ingredient_name: "oregano",
  },
  {
    pizza_name: "Margherita",
    ingredient_name: "tomato",
  },
  {
    pizza_name: "Margherita",
    ingredient_name: "mozzarella",
  },
  {
    pizza_name: "Bufala",
    ingredient_name: "oregano",
  },
  {
    pizza_name: "Bufala",
    ingredient_name: "tomato",
  },
  {
    pizza_name: "Bufala",
    ingredient_name: "mozarella di bufala",
  },
  {
    pizza_name: "Romana",
    ingredient_name: "tomato",
  },
  {
    pizza_name: "Romana",
    ingredient_name: "mozzarella",
  },
  {
    pizza_name: "Romana",
    ingredient_name: "anchovies",
  },
  {
    pizza_name: "Romana",
    ingredient_name: "oregano",
  },
  {
    pizza_name: "Romana",
    ingredient_name: "oil",
  },
  {
    pizza_name: "Diavola",
    ingredient_name: "tomato",
  },
  {
    pizza_name: "Diavola",
    ingredient_name: "mozzarella",
  },
  {
    pizza_name: "Diavola",
    ingredient_name: "oregano",
  },
  {
    pizza_name: "Diavola",
    ingredient_name: "spicy-salami",
  },
  {
    pizza_name: "Bianca",
    ingredient_name: "mozzarella",
  },
  {
    pizza_name: "Bianca",
    ingredient_name: "oregano",
  },
  {
    pizza_name: "4 queijos",
    ingredient_name: "oregano",
  },
  {
    pizza_name: "4 queijos",
    ingredient_name: "mozzarella",
  },
  {
    pizza_name: "4 queijos",
    ingredient_name: "gorgonzola",
  },
  {
    pizza_name: "4 queijos",
    ingredient_name: "parmesão",
  },
  {
    pizza_name: "4 queijos",
    ingredient_name: "provolone",
  },
  {
    pizza_name: "Portuguesa",
    ingredient_name: "oregano",
  },
  {
    pizza_name: "Portuguesa",
    ingredient_name: "mozzarella",
  },
  {
    pizza_name: "Portuguesa",
    ingredient_name: "presunto",
  },
  {
    pizza_name: "Portuguesa",
    ingredient_name: "ovo cozido",
  },
  {
    pizza_name: "Portuguesa",
    ingredient_name: "azeitonas",
  },
  {
    pizza_name: "Calabreza",
    ingredient_name: "parmesão",
  },
  {
    pizza_name: "Calabreza",
    ingredient_name: "calabresa",
  },
  {
    pizza_name: "Calabreza",
    ingredient_name: "oregano",
  },
  {
    pizza_name: "Calabreza",
    ingredient_name: "mozzarella",
  },
  {
    pizza_name: "Alla Moda",
    ingredient_name: "presunto",
  },
  {
    pizza_name: "Alla Moda",
    ingredient_name: "calabresa",
  },
  {
    pizza_name: "Alla Moda",
    ingredient_name: "salaminho Italiano",
  },
  {
    pizza_name: "Alla Moda",
    ingredient_name: "mozzarella",
  },
];
