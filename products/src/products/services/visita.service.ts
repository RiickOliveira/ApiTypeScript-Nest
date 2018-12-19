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
                    attributes : ['nome','digital']
                },
                {
                    model:Condomino,
                    attributes:['endereco'],

                    include : [{
                        model : Pessoa,
                        attributes : ['nome']
                    }]
                },
                {
                    model : Porteiro,
                    attributes : ['id'],

                    include : [{
                        model : Pessoa,
                        attributes : ['nome']
                    }]
                }
            ]
        });
    }

    async findById(id:number): Promise<Visita> {
        return await this.visitaRepository.findById(id,{
            include: [
                {
                    model : Pessoa,
                    attributes : ['nome','digital']
                },
                {
                    model:Condomino,
                    attributes:['endereco'],

                    include : [{
                        model : Pessoa,
                        attributes : ['nome']
                    }]
                },
                {
                    model : Porteiro,
                    attributes : ['id'],

                    include : [{
                        model : Pessoa,
                        attributes : ['nome']
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
    
        if (!usuario.id) {
            console.error('VISISTA NAO ENCONTRADA');
            return;
        }
    
        usuario = this._assign(usuario, newValue);
    
        return await usuario.save({ returning: true });
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