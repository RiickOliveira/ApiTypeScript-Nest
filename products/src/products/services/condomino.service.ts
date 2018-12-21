import { Injectable, Inject, Request, Query} from '@nestjs/common'
import { CreateCondominoDto } from '../dto/createCondominoDto'
import { Condomino } from '../models/condomino.model';
import { Usuario } from '../models/usuario.model';
import { Pessoa } from '../models/pessoa.model';
import { Sequelize } from 'sequelize-typescript';
import sequelize = require('sequelize');

@Injectable()
export class CondominoService {
    constructor (
        @Inject ('CondominoRepository') private readonly CondominoRepository: typeof Condomino,
        @Inject ('UsuarioRepository') private readonly usuarioRepository: typeof Usuario,
        @Inject ('PessoaRepository') private readonly pessoaRepository: typeof Pessoa,
        @Inject ('SequelizeToken') private readonly sequelize
    ) { }
    
    async findAll(): Promise<Condomino[]> {
        return await this.CondominoRepository.findAll<Condomino>({
            include : [
                {
                    model: Pessoa,
                },
                {
                    model:Usuario,
                    attributes:['email','desativado']
                }
            ]
        })
    }

    async findById(id:number): Promise<Condomino> {
        return await this.CondominoRepository.findById(id,{
            include : [
                {
                    model: Pessoa,
                },
                {
                    model:Usuario,
                    attributes:['email','desativado','senha']
                }
            ]
        });
    }
    
    async create (createCondominoDto : CreateCondominoDto): Promise<Condomino> {
        return await this.sequelize.transaction( async t => {
            
            const usuario = await this.usuarioRepository.create<Usuario>(createCondominoDto.usuario,{transaction :t})
            const pessoa = await this.pessoaRepository.create<Pessoa>(createCondominoDto.pessoa,{transaction :t})
        
            createCondominoDto.usuarioId = usuario.id;
            createCondominoDto.pessoaId = pessoa.id;
            
            return await this.CondominoRepository.create<Condomino>(createCondominoDto,{transaction :t});
        })
           
    }

    async update (id:number, newValue:CreateCondominoDto): Promise<Condomino | null> {
        return await this.sequelize.transaction( async t => {
            
            let condomino = await this.CondominoRepository.findById<Condomino>(id,{transaction:t});
            let cond = condomino.get({plain : true})

            if (!condomino) {
                throw new Error('Condomino nao encontrado!')
            }

            newValue.pessoaId = cond.pessoaId;
            newValue.usuarioId = cond.usuarioId;

            await this.usuarioRepository.update(newValue.usuario,{
                transaction : t,
                where : {
                    id : cond.usuarioId
                },
            })

            await this.pessoaRepository.update(newValue.pessoa,{
                transaction : t,
                where : {
                    id : cond.pessoaId,
                },
            })
            
            condomino = this._assign(condomino, newValue);
            return await condomino.save({returning:true,transaction:t})        
            
        })
    }

    async delete (id:number): Promise<number> {
        return await this.sequelize.transaction(async t => {
            
            let condomino = await this.CondominoRepository.findById<Condomino>(id,{transaction : t});
            let cond = condomino.get({plain:true})

            if (!condomino) {
                throw new Error('Condomino nao encontrado!')
            }
            
            await this.usuarioRepository.destroy({
                transaction : t,
                where : {
                    id : cond.usuarioId
                }
            });
            await this.pessoaRepository.destroy({
                transaction : t,
                where : {
                    id : cond.pessoaId
                }
            });
            
            return await this.CondominoRepository.destroy({
                transaction : t,
                where : {id}
            });
        })    
    }

    private _assign(condomino: CreateCondominoDto , newValue: CreateCondominoDto): Condomino {
        for (const key of Object.keys(condomino['dataValues'])) {
          if (condomino[key] !== newValue[key]) {
            condomino[key] = newValue[key];
          }
        }
        return condomino as Condomino;
    }
}