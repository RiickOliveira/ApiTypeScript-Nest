import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { IAuthService, IJwtOptions } from './interfaces/auth-service.interface';
import { Usuario } from '../products/models/usuario.model';
import { Injectable,Inject } from '@nestjs/common';
import { Porteiro } from 'src/products/models/porteiro.model';
import { Condomino } from 'src/products/models/condomino.model';
import { Pessoa } from 'src/products/models/pessoa.model';

@Injectable()
export class AuthService implements IAuthService {
    constructor (
        @Inject ('CondominoRepository') public readonly condominoRepository: typeof Condomino,
        @Inject ('PorteiroRepository') public readonly porteiroRepository: typeof Porteiro,
    ) {}
    private readonly JWT_KEY : string = '0679ce86-6ca0-44c4-9820-cc800bca23fb';    
    
    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '15m',
        jwtid: ''
    };

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

    public async sign(credentials: { email: string; senha: string, tipo: number }): Promise<Object> {
        const user = await Usuario.findOne<Usuario>({

            where: {
                email: credentials.email,
                senha: credentials.senha,
                tipo : credentials.tipo
            }
            
        });
        
        if (!user) {
            throw new Error("Usuario nao encontrado!");
        }

        let usuarioAutorizado = {
            id : user.id,
            nome : user.email
        }
    
        let updateFields = {
            token   : await jwt.sign(usuarioAutorizado, this.JWT_KEY, this._options)
        }
        
        await user.update(updateFields);

        let usuarioLog = user.get({plain:true})
        
        let userLogado = {
            id    : usuarioLog.id, 
            email : usuarioLog.email,
            tipo  : usuarioLog.tipo,
            token : usuarioLog.token
        }

        switch (userLogado.tipo) {
            case 1: 
                let porteiro = await this.porteiroRepository.findOne({
                    where : {
                        usuarioId : userLogado.id
                    }, include : [
                        {
                            model : Usuario,
                            attributes : ['email','token']
                        },
                        {
                            model : Pessoa,
                            attributes : ['nome']
                        }
                    ]
                })

                return porteiro;

            break;     

            case 2 : 
            
                let condomino = await this.condominoRepository.findOne({
                    where : {
                        usuarioId : userLogado.id
                    }, include : [
                        {
                            model : Usuario,
                            attributes :['email','token']
                        },
                        {
                            model : Pessoa,
                            attributes : ['nome']
                        }
                    ]
                })
                
                return condomino;

            break;   
                
            case 3 :
                return userLogado;
            break;
        }
        
        
    }
}