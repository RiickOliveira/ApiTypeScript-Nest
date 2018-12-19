import { Usuario } from "src/products/models/usuario.model";

export interface IAuthService {
    options: IJwtOptions;

    /**
     * @description: Sign the user, create a new token before it insert in the response header Authorization.
     * @param {email: string; password: string} credentials
     * @return {Promise<object>}
     */
    sign(credentials: { email: string; senha: string }): Promise<Usuario>;
}

export interface IJwtOptions {
    algorithm: string;
    expiresIn: number | string;
    jwtid: string;
}