import { UserDatabase } from "../database/UserDatabase";
import { ParamsError } from "../errors/ParamsError";
import { ConflictError } from "../errors/ConflictError";
import {
  IGetAddressInputDTO,
  IGetUserInputDTO,
  IGetUserOutputDTO,
  ILoginInputDTO,
  ILoginOutputDTO,
  ISignupInputDTO,
  ISignupOutputDTO,
  IUpdateUserDTO,
  IUpdateUserInputDTO,
  IUpdateUserOutputDTO,
  User,
  USER_ROLES,
} from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { NotFoundError } from "../errors/NotFoundError";
import { AuthenticationError } from "../errors/AuthenticationError";
import {
  Address,
  IAddressInputDTO,
  IAddressOutputDTO,
  IGetAddressOutputDTO,
} from "../models/Address";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private authenticator: Authenticator,
    private hashmanager: HashManager,
    private idGenerator: IdGenerator
  ) {}

  public signup = async (input: ISignupInputDTO) => {
    const { name, email, cpf, password } = input;

    if (!name || !email || !cpf || !password) {
      throw new ParamsError();
    }

    if (typeof name !== "string" || name.length < 3) {
      throw new ParamsError("Parâmetro name inválido.");
    }

    if (typeof email !== "string" || email.length < 3) {
      throw new ParamsError("Parâmetro email inválido.");
    }

    if (typeof cpf !== "string" || cpf.length < 14) {
      throw new ParamsError("Digite um cpf válido.");
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new ParamsError(
        "A senha deve ser uma string de no mínimo 6 caracteres."
      );
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new ParamsError("Parâmetro email inválido.");
    }

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (userDB) {
      throw new ConflictError("E-mail ou usuário já cadastrado");
    }

    const id = this.idGenerator.generate();

    const hashPassword = await this.hashmanager.hash(password);

    const newUser = new User(
      id,
      name,
      email,
      cpf,
      hashPassword,
      USER_ROLES.NORMAL
    );

    const payload: ITokenPayload = {
      id: newUser.getId(),
      role: newUser.getRole(),
    };

    const token = this.authenticator.generateToken(payload);

    await this.userDatabase.createUser(newUser);

    const response: ISignupOutputDTO = {
      message: "Cadastro realizado com sucesso",
      token,
      user: {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        cpf: newUser.getCpf(),
        role: newUser.getRole(),
        hasAddress: false,
      },
    };
    return response;
  };

  public updateUser = async (
    input: IUpdateUserInputDTO
  ): Promise<IUpdateUserOutputDTO> => {
    const { name, email, cpf, token } = input;

    if (!name || !email || !cpf) {
      throw new ParamsError("Todos os parâmetros devem ser preenchidos");
    }

    if (typeof name !== "string" || name.length < 3) {
      throw new ParamsError("Parâmetro name inválido.");
    }

    if (typeof email !== "string" || email.length < 3) {
      throw new ParamsError("Parâmetro email inválido.");
    }

    if (typeof cpf !== "string" || cpf.length < 14) {
      throw new ParamsError("Digite um cpf válido.");
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new ParamsError("Parâmetro email inválido.");
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new AuthenticationError("Token inválido");
    }

    const userDB = await this.userDatabase.findUserById(payload.id);

    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const newUser: IUpdateUserDTO = { name, email, cpf };

    await this.userDatabase.updateUser(payload.id, newUser);

    const addressDB = await this.userDatabase.findAddressById(payload.id);

    let hasAddressDB = false;

    if (addressDB) hasAddressDB = true;

    const newUserDB = await this.userDatabase.findUserById(payload.id);

    const response: IUpdateUserOutputDTO = {
      message: "Cadastro atualizado com sucesso",
      user: {
        id: newUserDB.id,
        name: newUserDB.name,
        email: newUserDB.email,
        cpf: newUserDB.cpf,
        role: newUserDB.role,
        hasAddress: hasAddressDB,
      },
    };
    return response;
  };

  public address = async (input: IAddressInputDTO) => {
    const { token, street, number, neighbourhood, city, state, complement } =
      input;

    if (!street || !number || !neighbourhood || !city || !state) {
      throw new ParamsError();
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new AuthenticationError("Token inválido");
    }

    const userDB = await this.userDatabase.findUserById(payload.id);

    if (!userDB) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const userId = payload.id;

    const addressDB = await this.userDatabase.findAddressById(userId);

    const address = new Address(
      userId,
      street,
      number,
      neighbourhood,
      city,
      state,
      complement
    );

    const newpayload: ITokenPayload = {
      id: payload.id,
      role: payload.role,
    };

    const newtoken = this.authenticator.generateToken(newpayload);

    if (!addressDB) {
      await this.userDatabase.registerAddress(address);
      const response: IAddressOutputDTO = {
        message: "Cadastrado com sucesso",
        token: newtoken,
        address: {
          id: payload.id,
          street,
          number,
          neighbourhood,
          city,
          state,
          complement,
          hasAddress: true,
        },
      };
      return response;
    } else {
      await this.userDatabase.updateAddress(userId, address);
      const response: IAddressOutputDTO = {
        message: "Atualizado com sucesso",
        token: newtoken,
        address: {
          id: payload.id,
          street,
          number,
          neighbourhood,
          city,
          state,
          complement,
          hasAddress: true,
        },
      };
      return response;
    }
  };

  public getAddress = async (input: IGetAddressInputDTO) => {
    const { token } = input;

    if (!token) {
      throw new ParamsError("Insira um token");
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new AuthenticationError("Token inválido");
    }

    const addressDB = await this.userDatabase.findAddressById(payload.id);

    const response: IGetAddressOutputDTO = {
      address: {
        street: addressDB.street,
        number: addressDB.number,
        neighbourhood: addressDB.neighbourhood,
        city: addressDB.city,
        state: addressDB.state,
        complement: addressDB.complement,
      },
    };
    return response
  };

  public login = async (input: ILoginInputDTO) => {
    const { email, password } = input;

    if (!email || !password) {
      throw new ParamsError();
    }

    if (typeof email !== "string" || email.length < 3) {
      throw new ParamsError("Parâmetro email inválido.");
    }

    if (typeof password !== "string" || password.length < 6) {
      throw new ParamsError(
        "A senha deve ser uma string de no mínimo 6 caracteres."
      );
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      throw new ParamsError("Parâmetro email inválido.");
    }

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new NotFoundError("Senha ou email inválidos.");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.cpf,
      userDB.password,
      userDB.role
    );

    const isCorrectPassword = await this.hashmanager.compare(
      password,
      user.getPassword()
    );

    if (!isCorrectPassword) {
      throw new AuthenticationError("Senha ou email inválidos.");
    }

    const payload: ITokenPayload = {
      id: user.getId(),
      role: user.getRole(),
    };

    const addressDB = await this.userDatabase.findAddressById(payload.id);

    let hasAddressDB;

    if (!addressDB) {
      hasAddressDB = false;
    } else hasAddressDB = true;

    const token = this.authenticator.generateToken(payload);

    const response: ILoginOutputDTO = {
      token,
      message: `Seja bem vindo ${user.getName()}`,
      user: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        cpf: user.getCpf(),
        role: user.getRole(),
        hasAddress: hasAddressDB,
      },
    };

    return response;
  };

  public getUser = async (
    input: IGetUserInputDTO
  ): Promise<IGetUserOutputDTO> => {
    const { token } = input;

    if (!token) {
      throw new ParamsError("Insira um token");
    }

    const payload = this.authenticator.getTokenPayload(token);

    if (!payload) {
      throw new AuthenticationError("Token inválido");
    }

    const user = await this.userDatabase.findUserById(payload.id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const addressDB = await this.userDatabase.findAddressById(payload.id);

    let hasAddressDB;

    if (!addressDB) {
      hasAddressDB = false;
    } else hasAddressDB = true;

    if (hasAddressDB === true) {
      const response: IGetUserOutputDTO = {
        message: "sucesso!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          role: user.role,
          hasAddress: hasAddressDB,
          address: `${addressDB.street}, nº ${addressDB.number} - ${addressDB.neighbourhood}, ${addressDB.city}`,
        },
      };
      return response;
    } else {
      const response: IGetUserOutputDTO = {
        message: "sucesso!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          role: user.role,
          hasAddress: hasAddressDB,
        },
      };
      return response;
    }
  };

  
}
