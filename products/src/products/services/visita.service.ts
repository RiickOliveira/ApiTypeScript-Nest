import { Injectable, Inject} from '@nestjs/common'
import { Visita } from '../models/visita.model';
import { CreateVisitaDto } from '../dto/createVisitaDto';
import { Condomino } from '../models/condomino.model';
import { Pessoa } from '../models/pessoa.model';
import { Porteiro } from '../models/porteiro.model';

@Injectable()
export class VisitaService {
    constructor (
        @Inject('VisitaRepository') private readonly visitaRepository: typeof Visita
    ) { }

    async findAll():Promise<Visita[]> {
        return await this.visitaRepository.findAll<Visita>({
            include: [
                {
                    model : Pessoa,
                    attributes : ['id','nome','digital']
                },
                {
                    model:Condomino,
                    attributes:['endereco'],

                    include : [{
                        model : Pessoa,
                        attributes : ['id','nome']
                    }]
                },
                {
                    model : Porteiro,
                    attributes : ['id'],

                    include : [{
                        model : Pessoa,
                        attributes : ['id','nome']
                    }]
                }
            ]
        });
    }

    async findVisita(condominoId:number): Promise<Visita[]> {  
        return await this.visitaRepository.findAll({
            include : [{
                model : Pessoa
            }],
            where : {
                condominoId : condominoId
            }
        })

    }

    async findOneVisita(id:number):Promise<Visita[]> {
        return await this.visitaRepository.findAll({
            include : [{
                model : Pessoa,
            }],
            where : {
                id : id
            }
        })
    }

    async findById(id:number): Promise<Visita> {
        return await this.visitaRepository.findById(id,{
            include: [
                {
                    model : Pessoa,
                    attributes : ['id','nome','digital']
                },
                {
                    model:Condomino,
                    attributes:['endereco'],

                    include : [{
                        model : Pessoa,
                        attributes : ['id','nome']
                    }]
                },
                {
                    model : Porteiro,
                    attributes : ['id'],

                    include : [{
                        model : Pessoa,
                        attributes : ['id','nome']
                    }]
                }
            ]
        });
    }

    async create (createVisitaDto : CreateVisitaDto): Promise<Visita> {
        return await this.visitaRepository.create<Visita>(createVisitaDto);
    }

    async update(id: number, newValue: CreateVisitaDto): Promise<Visita | null> {

        let usuario = await this.visitaRepository.findById<Visita>(id);
    
        if (!usuario) {
            throw new Error('Visita nao encontrada!');
        }
    
        usuario = this._assign(usuario, newValue);
    
        return await usuario.save({ returning: true });
    }

    async updateIdVisita(id:number, newValue: CreateVisitaDto):Promise<Visita | null> {
        let visita = await this.visitaRepository.findById<Visita>(id);
    
        return await visita.update({
            pessoaId: newValue 
        },{
            where : {
                id : visita.id
            }
        });
    }

    async delete(id:number): Promise<Number> {
        return await this.visitaRepository.destroy({
            where : {id},
        })
    }

    private _assign(visita: CreateVisitaDto, newValue: CreateVisitaDto): Visita {
        for (const key of Object.keys(visita['dataValues'])) {
          if (visita[key] !== newValue[key]) {
            visita[key] = newValue[key];
          }
        }
        return visita as Visita;
    }
}