import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { IAuthService, IJwtOptions } from './interfaces/auth-service.interface';
import { Usuario } from '../products/models/usuario.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
    private readonly JWT_KEY : string = '0679ce86-6ca0-44c4-9820-cc800bca23fb';    
    
    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '3000',
        jwtid: ''
    };

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

    public async sign(credentials: { email: string; senha: string, tipo: number }): Promise<Usuario> {
        const user = await Usuario.findOne<Usuario>({

            where: {
                email: credentials.email,
                senha: credentials.senha,
                tipo : credentials.tipo
            }
            
        });
        
        if (!user) {
            console.error('user not found');
        }

        let useras = user.get({plain:true})
        delete useras.senha;

        let usuarioAutorizado = {
            id : user.id,
            nome : user.email
        }
    
        let updateFields = {
            token   : await jwt.sign(usuarioAutorizado, this.JWT_KEY, this._options)
        }
        
        let usuario = await user.update(updateFields);
        console.log(useras)
        return useras;
    }
}