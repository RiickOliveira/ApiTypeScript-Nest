import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Usuario } from '../../products/models/usuario.model';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private readonly JWT_KEY : string = '0679ce86-6ca0-44c4-9820-cc800bca23fb';    
    
    public resolve() {
        return async (req, res, next) => {
            if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
                const token = (req.headers.authorization as string).split(' ')[1];
                const decoded : any = jwt.verify(token, this.JWT_KEY || '',function(err){
                    if (err) {
                        if (err.name == "TokenExpiredError") {
                            res.status(401).json({sucesso:false, mensagem:"Sua sessão expirou!"});
                            return;
                        } else {
                            res.status(401).json({sucesso:false, mensagem:"Token inválido! Efetue login novamente"});
                            return;
                        }
                    }
                    
                });
                
                const user = await Usuario.findOne<Usuario>({
                    where: {
                        token: token
                    }
                });
                
                if (!user) {
                    res.status(401).json({msg:'Usuario nao encontrado'});
                };
                next();
            } else {
                res.status(401).json({msg:'Acesso nao autorizado!'});
            }
        };
    }
}