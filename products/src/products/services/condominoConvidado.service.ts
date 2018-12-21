import { Injectable, Inject} from '@nestjs/common'
import { Pessoa } from '../models/pessoa.model';
import { CondominoConvidado } from '../models/condominoConvidado.model';
import { CreateCondominoConvidadoDto } from '../dto/createCondominoConvidadoDto';
import { Condomino } from '../models/condomino.model';
import { Sequelize } from 'sequelize-typescript'
import { create } from 'domain';

@Injectable()
export class CondominoConvidadoService {
    constructor (
        @Inject('CondominoConvidadoRepository') private readonly convidadoRepository : typeof CondominoConvidado,
        @Inject('PessoaRepository') private readonly pessoaRepository : typeof Pessoa,
        @Inject ('SequelizeToken') private readonly sequelize
    ) { }
    private readonly Op = Sequelize.Op;

    async findAll(): Promise<CondominoConvidado[]> {
        return await this.convidadoRepository.findAll({
            include : [
                {
                    model: Pessoa,
                    attributes:['nome','digital']
                },
                {
                    model:Condomino,
                    attributes:['endereco'],

                    include : [{
                        model : Pessoa,
                        attributes : ['nome']
                    }]
                }
            ]
        });
    }
    
    async findCondomino(idCondomino:number, search:string): Promise<CondominoConvidado[]> {
        return await this.convidadoRepository.findAll({
            include : [{
                model : Pessoa,
                where : {
                    nome : {
                        [this.Op.iLike] : '%'+search+'%'
                    }
                }
            }],
            where : {
                condominoId : idCondomino,
            }
        });
    }

    async findOneCondomino(idCondomino:number): Promise<CondominoConvidado[]> {
        return await this.convidadoRepository.findAll({
            include : [{
                model : Pessoa,
            }],
            where : {
                condominoId : idCondomino
            }
        });
    }
    
    async findById(id:number): Promise<CondominoConvidado> {
        return await this.convidadoRepository.findById(id,{
            include : [
                {
                    model: Pessoa,
                    attributes:['nome','digital']
                },
                {
                    model:Condomino,
                    attributes:['endereco'],

                    include : [{
                        model : Pessoa,
                        attributes : ['nome']
                    }]
                }
            ]
        });
    }

    async create (createConvidado : CreateCondominoConvidadoDto): Promise<CondominoConvidado> {
        return await this.sequelize.transaction(async t => {
            
            const pessoa = await this.pessoaRepository.create<Pessoa>(createConvidado.pessoa,{transaction:t});

            createConvidado.pessoaId = pessoa.id;

            return await this.convidadoRepository.create<CondominoConvidado>(createConvidado,{transaction:t});
        })    
            
    }

    async update (id:number, newValue: CreateCondominoConvidadoDto): Promise<CondominoConvidado | null> {
        return await this.sequelize.transaction(async t => {
            
            let convidado = await this.convidadoRepository.findById(id)     

            if (!convidado) {
                throw new Error('Convidado nao encontrado');
            }

            convidado.pessoa.update(newValue.pessoa,{transaction:t});

            convidado = this._assign(convidado,newValue)
            return await convidado.save({returning:true,transaction:t})
        })
    }

    async favoritaConvidado(id:number, newValue: CreateCondominoConvidadoDto) : Promise<CondominoConvidado | null> {
        const convidado = await this.convidadoRepository.findById(id);

        if (!convidado) {
           throw new Error('Convidado nao encontrado!');
        }

        return await convidado.update({
            favorito : newValue.favorito
            },{
                where : {
                    id : {id}
                }
        })
    }

    async delete (id:number): Promise<number> {
        return this.sequelize.transaction(async t => {
            let convidado = await this.convidadoRepository.findById(id);

            if (!convidado) {
                throw new Error('Convidado nao encontrado!')
            }
            
            convidado.pessoa.destroy({transaction:t})

            return await this.convidadoRepository.destroy({
                transaction :t,
                where : {id}
            })
        })    
    }

    private _assign(convidado: CreateCondominoConvidadoDto , newValue: CreateCondominoConvidadoDto): CondominoConvidado {
        for (const key of Object.keys(convidado['dataValues'])) {
          if (convidado[key] !== newValue[key]) {
            convidado[key] = newValue[key];
          }
        }
        return convidado as CondominoConvidado;
    }
}