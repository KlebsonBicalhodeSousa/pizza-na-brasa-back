import { Address, IAddressDB } from "../models/Address";
import { IUpdateUserDTO, IUserDB, User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Amb2_User"
    public static TABLE_ADDRESS = "Amb2_Address"

    public toUserDBModel = (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            cpf: user.getCpf(),
            password: user.getPassword(),
            role: user.getRole()
        }

        return userDB
    }
    
    public toAddressDBModel = (address: Address) => {
        const addressDB: IAddressDB = {
            user_id: address.getUserId(),
            street: address.getStreet(),
            number: address.getNumber(),
            neighbourhood: address.getNeighbourhood(),
            city: address.getCity(),
            state: address.getState(),
            complement: address.getComplement()
        }

        return addressDB
    }

    public createUser = async (user: User): Promise<void> => {
        const userDB = this.toUserDBModel(user)
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public registerAddress = async (address: Address): Promise<void> => {
        const addressDB: IAddressDB = this.toAddressDBModel(address)
        await BaseDatabase
            .connection(UserDatabase.TABLE_ADDRESS)
            .insert(addressDB)
    }
    
    public updateAddress = async (userId: string, address: Address): Promise<void> => {
        const addressDB: IAddressDB = this.toAddressDBModel(address)
        await BaseDatabase
            .connection(UserDatabase.TABLE_ADDRESS)
            .update(addressDB)
            .where({user_id: userId})
    }  

    public updateUser = async (userId: string, user: IUpdateUserDTO): Promise<void> => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update({name: user.name, email: user.email, cpf: user.cpf})
            .where({id: userId})
    }  

    public findUserByEmail = async (email: string): Promise<IUserDB> => {
        const usersDB: IUserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({ email })

        return usersDB[0]
    }

    public findUserById = async (userId: string): Promise<IUserDB> => {
        const usersDB: IUserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({ id: userId })

        return usersDB[0]
    }
    public findAddressById = async (userId: string): Promise<IAddressDB> => {
        const addressDB: IAddressDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_ADDRESS)
        .select()
        .where({ user_id: userId })

        return addressDB[0]
    }
}