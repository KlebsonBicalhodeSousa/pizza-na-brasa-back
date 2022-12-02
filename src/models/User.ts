export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export interface IUserDB {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: USER_ROLES;
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private cpf: string,
    private password: string,
    private role: USER_ROLES
  ) {}

  public toUserModel = (userDB: IUserDB) => {
    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.cpf,
      userDB.password,
      userDB.role
    );

    return user;
  };

  public getId = () => {
    return this.id;
  };

  public getName = () => {
    return this.name;
  };

  public getEmail = () => {
    return this.email;
  };

  public getCpf = () => {
    return this.cpf;
  };

  public getPassword = () => {
    return this.password;
  };

  public getRole = () => {
    return this.role;
  };

  public setName = (newName: string) => {
    this.name = newName;
  };

  public setEmail = (newEmail: string) => {
    this.email = newEmail;
  };

  public setCpf = (newCpf: string) => {
    this.cpf = newCpf;
  };

  public setPassword = (newPassword: string) => {
    this.password = newPassword;
  };

  public setRole = (newRole: USER_ROLES) => {
    this.role = newRole;
  };
}

export interface ISignupInputDTO {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

export interface IUpdateUserInputDTO {
  name: string;
  email: string;
  cpf: string
  token: string
}
export interface IUpdateUserDTO {
  name: string;
  email: string;
  cpf: string
}

export interface ISignupOutputDTO {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: string;
    hasAddress: boolean;
  };
}
export interface IUpdateUserOutputDTO {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: string;
    hasAddress: boolean;
  };
}



// {
//   "address": {
//     "neighbourhood": "Vila N. Conceição",
//     "number": "177",
//     "city": "São Paulo",
//     "apartment": null,
//     "state": "SP",
//     "street": "R. Afonso Braz"
//   }
// }

export interface ILoginInputDTO {
  email: string;
  password: string;
}

export interface ILoginOutputDTO {
  token: string;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: string;
    hasAddress: boolean;
  };
}

export interface IGetUserInputDTO {
  token: string;
}

export interface IGetAddressInputDTO {
  token: string;
}

export interface IGetUserOutputDTO {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: string;
    hasAddress: boolean;
    address?: string;
  };
}
