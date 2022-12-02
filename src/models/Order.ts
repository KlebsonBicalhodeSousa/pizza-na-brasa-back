export interface IOrderDB {
  id: string;
  user_id: string;
  paymentMethod: string;
}
export interface IOrderItemDB {
  id: string;
  pizza_name: string;
  quantity: number;  
  order_id: string;
}

export interface IOrderItem {
  id: string;
  pizza_name: string;
  quantity: number;
  price: number;
  order_id: string;
}

export interface IOrderResume {
  id: string;
  userName: string;
    pizzas: {
      name: string;
      price: number;
      quantity: number;
    }[];
    paymentMethod: string;
    total: number;
}

export class Order {
  private total: number = 0
  constructor(
    private id: string,
    private user: string, 
    private paymentMethod: string, 
    private orderItems: IOrderItem[],
    ){
      this.total = this.calculateTotal()
    } 

    private calculateTotal = () => {
    const total = this.orderItems.reduce(
      (acc, pizza) => acc + (pizza.price * pizza.quantity), 0)
      return total
  };

  public getId = () => {
    return this.id;
  };
  public getUser = () => {
    return this.user;
  };

  public getPaymentMethod = () => {
    return this.paymentMethod;
  };

  public getOrderItems = () => {
    return this.orderItems;
  };

  public setOrderItems = (newOrderItems: IOrderItem[]) => {
    this.orderItems = newOrderItems;
    this.total = this.calculateTotal()
  };

  public addOrderItem = (newOrderItem: IOrderItem) => {
    this.orderItems.push(newOrderItem);
    this.total = this.calculateTotal()
  };

  public removeOrdemItem = (idToremove: string) => {
    this.orderItems = this.orderItems.filter((orderItem) => orderItem.id !== idToremove);
    this.total = this.calculateTotal()
  };

public getTotal = () => {
  return this.total
}
  
}

export interface ICreateOrderInputDTO {
  token: string
  pizzas: {
    name: string
    quantity: number
  }[]
  paymentMethod: string
}

export interface ICreateOrderOutputDTO {
  message: string;
  order: IOrderResume
}

export interface IGetOrderInputDTO {
  token: string
}
export interface IGetOrdersOutputDTO {
  orders: IOrderResume[]
}
