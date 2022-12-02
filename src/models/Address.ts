export interface IAddressDB {
  user_id: string,
  street: string,
  number: string,
  neighbourhood: string,
  city: string,
  state: string,
  complement?: string,
}

export class Address {
    
  constructor(
    private userId: string,
    private street: string,
    private number: string,
    private neighbourhood: string,
    private city: string,
    private state: string,
    private complement?: string
  ) {}

  public toAddressDBModel = (addressDB: IAddressDB) => {
    const address = new Address(
        addressDB.user_id,
        addressDB.street,
        addressDB.number,
        addressDB.neighbourhood,
        addressDB.city,
        addressDB.state,
        addressDB.complement
    );

    return address;
  };

  public getUserId = () => {
    return this.userId;
  };

  public getStreet = () => {
    return this.street;
  };

  public getNumber = () => {
    return this.number;
  };

  public getNeighbourhood = () => {
    return this.neighbourhood;
  };

  public getCity = () => {
    return this.city;
  };

  public getState = () => {
    return this.state;
  };

  public getComplement = () => {
    return this.complement;
  };

  public setStreet = (newStreet: string) => {
    this.street = newStreet;
  };

  public setNumber = (newNumber: string) => {
    this.number = newNumber;
  };

  public setNeighbourhood = (newNeighbourhood: string) => {
    this.neighbourhood = newNeighbourhood;
  };

  public setCity = (newCity: string) => {
    this.city = newCity;
  };

  public setState = (newState: string) => {
    this.state = newState;
  };
  
  public setComplement = (newComplement: string) => {
    this.complement = newComplement;
  };
}

export interface IAddressInputDTO {
    token: string
    street: string,
    number: string,
    neighbourhood: string,
    city: string,
    state: string,
    complement?: string
}

export interface IGetAddressOutputDTO {
   address:{
    street: string,
    number: string,
    neighbourhood: string,
    city: string,
    state: string,
    complement?: string
  }
}

export interface IAddressOutputDTO {
  message: string;
  token: string;
  address: {
    id: string;
    street: string;
    number: string;
    neighbourhood: string;
    city: string;
    state: string;
    complement?: string;
    hasAddress: boolean;
  };
}

// export interface IGetUsersInputDBDTO {
//   search: string;
//   order: string;
//   sort: string;
//   limit: number;
//   offset: number;
// }

// // da controller para a business
// export interface IGetUsersInputDTO {
//   token: string;
//   search: string;
//   order: string;
//   sort: string;
//   limit: string;
//   page: string;
// }
