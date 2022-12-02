import { IdGenerator } from "../services/IdGenerator";
import { OrderDatabase } from "../database/OrderDatabase";
import {
  ICreateOrderInputDTO,
  ICreateOrderOutputDTO,
  IGetOrderInputDTO,
  IGetOrdersOutputDTO,
  IOrderDB,
  IOrderItemDB,
  Order,
} from "../models/Order";
import { ParamsError } from "../errors/ParamsError";
import { NotFoundError } from "../errors/NotFoundError";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { AuthenticationError } from "../errors/AuthenticationError";

export class OrderBusiness {
  constructor(
    private orderDatabase: OrderDatabase,
    private userDatabase: UserDatabase,
    private authenticator: Authenticator,
    private idGenerator: IdGenerator
  ) {}


  public createOrder = async (input: ICreateOrderInputDTO) => {
    const pizzasInput = input.pizzas;
    const token = input.token
    const paymentMethod = input.paymentMethod
   
    const payload = this.authenticator.getTokenPayload(token)

    if (!payload) {
      throw new AuthenticationError("Token inválido")
    }

    if (!paymentMethod) {
      throw new ParamsError("Escolha uma forma de pagamento")
    }

    const userDB = await this.userDatabase.findUserById(payload.id);
    

    if (pizzasInput.length === 0) {
      throw new ParamsError("Pedido vazio! Informe ao menos uma pizza.");
    }

    const pizzas = pizzasInput.map((pizza) => {
      if (pizza.quantity <= 0) {
        throw new ParamsError(
          "Quantidade de pizza inválida! A quantidade mínima é 1."
        );
      }
      return {
        ...pizza,
        price: 0,
      };
    });

    for (let pizza of pizzas) {
      const price = await this.orderDatabase.getPrice(pizza.name);

      if (!price) {
        throw new NotFoundError("Pizza não existe");
      }
      pizza.price = price;
    }       

    const idOrder = this.idGenerator.generate()

    const newOrder: IOrderDB = {
      id: idOrder,
      user_id: userDB.id,
      paymentMethod: paymentMethod
    }

    await this.orderDatabase.createOrder(newOrder)
   
    for (let pizza of pizzas) {
      const orderItem: IOrderItemDB = {
        id: this.idGenerator.generate(),
        pizza_name: pizza.name,
        quantity: pizza.quantity,        
        order_id: newOrder.id,
      };
      await this.orderDatabase.insertItemOnOrder(orderItem);
    }

    const orderDB = await this.orderDatabase.getOrders(newOrder.id)

    const total = pizzas.reduce(
            (acc, pizza) => acc + (pizza.price * pizza.quantity), 0) 

    const response: ICreateOrderOutputDTO = {
      message: `Obrigado pela preferência ${userDB.name}, logo seu pedido estará pronto!`,
      order: {
        id: newOrder.id,
        userName: userDB.name,
        pizzas,
        paymentMethod: orderDB.paymentMethod,
        total: +total.toFixed(2)
      }
    }

    return response
  }

  public getAllOrders = async (): Promise<IGetOrdersOutputDTO> => {

      
    const ordersDB = await this.orderDatabase.getAllOrders()

    
    const orders: Order[] = []
    
    for (let orderDB of ordersDB) {
          const userDB = await this.userDatabase.findUserById(orderDB.id);
            const order = new Order(
                    orderDB.id,
                    userDB.name,
                    orderDB.paymentMethod,
                    []
                )
            const orderItemsDB: any = await 
            this.orderDatabase.getOrderItem(order.getId())

            for (let orderItemDB of orderItemsDB) {
              const price = await this.orderDatabase.getPrice(orderItemDB.pizza_name)

              orderItemDB.price = price
            }
               
            order.setOrderItems(orderItemsDB)

            orders.push(order)
        }
        if (orders.length === 0) {
          throw new NotFoundError("Não existe pedido")
        }

        const response: IGetOrdersOutputDTO = {
            orders: orders.map((order) => ({
                id: order.getId(),
                userName: order.getUser(),
                pizzas: order.getOrderItems().map((item) => ({
                  name: item.pizza_name,
                  quantity: item.quantity,
                  price: item.price,
                })),
                paymentMethod: order.getPaymentMethod(),
                total: order.getTotal()
            }))
        }

        return response
  }
  
  public getOrders = async (input: IGetOrderInputDTO) => {

      const {token} = input
    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new AuthenticationError("Token inválido");
    }

    const userDB = await this.userDatabase.findUserById(payload.id);

    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const ordersDB = await this.orderDatabase.getOrdersById(userDB.id)

    console.log(ordersDB)

    if (!ordersDB) {
      throw new NotFoundError("Ainda não fez nenhum pedido")
    }
    
    const orders: Order[] = []
    
    for (let orderDB of ordersDB) {
            const order = new Order(
                    orderDB.id,
                    userDB.name,
                    orderDB.paymentMethod,
                    []
                )
            const orderItemsDB: any = await 
            this.orderDatabase.getOrderItem(order.getId())

            for (let orderItemDB of orderItemsDB) {
              const price = await this.orderDatabase.getPrice(orderItemDB.pizza_name)

              orderItemDB.price = price
            }
               
            order.setOrderItems(orderItemsDB)

            orders.push(order)
        }
        

        const response: IGetOrdersOutputDTO = {
            orders: orders.map((order) => ({
                id: order.getId(),
                userName: order.getUser(),
                paymentMethod: order.getPaymentMethod(),
                pizzas: order.getOrderItems().map((item) => ({
                  name: item.pizza_name,
                  quantity: item.quantity,
                  price: item.price,
                })),
                total: order.getTotal()
            }))
        }

        return response
  }
}
