import { Injectable, Inject} from '@nestjs/common'
import { Pessoa } from '../models/pessoa.model';
import { CondominoConvidado } from '../models/condominoConvidado.model';
import { CreateCondominoConvidadoDto } from '../dto/createCondominoConvidadoDto';
import { Condomino } from '../models/condomino.model';

@Injectable()
export class CondominoConvidadoService {
    constructor (
        @Inject('CondominoConvidadoRepository') private readonly convidadoRepository : typeof CondominoConvidado,
        @Inject('PessoaRepository') private readonly pessoaRepository : typeof Pessoa
    ) { }

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
        const pessoa = await this.pessoaRepository.create<Pessoa>(createConvidado.pessoa);

        createConvidado.pessoaId = pessoa.id;

        return await this.convidadoRepository.create<CondominoConvidado>(createConvidado);
    }

    async update (id:number, newValue: CreateCondominoConvidadoDto): Promise<CondominoConvidado | null> {
        let convidado = await this.convidadoRepository.findById(id)     

        if (!convidado) {
            console.error('Convidado nao encontrado');
            return;
        }

        convidado.pessoa.update(newValue.pessoa);

        convidado = this._assign(convidado,newValue)
        return await convidado.save({returning:true})
    }

    async delete (id:number): Promise<number> {
        let convidado = await this.convidadoRepository.findById(id);

        if (!convidado) {
            console.error('Conviado nao encontrado')
            return;
        }
        
        convidado.pessoa.destroy()

        return await this.convidadoRepository.destroy({
            where : {id}
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