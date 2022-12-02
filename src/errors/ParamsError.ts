import { BaseError } from "./BaseError";

export class ParamsError extends BaseError {
    constructor(
        message: string = "Faltam parâmetros à serem preenchidos!" 
    ) {
        super(400, message)
    }
}