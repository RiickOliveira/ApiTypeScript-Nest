import { Injectable, Inject} from '@nestjs/common'
import { Pessoa } from '../models/pessoa.model';
import { CreatePessoaDto } from '../dto/createPessoaDto'

@Injectable()
export class PessoaService {
    constructor (
        @Inject ('PessoaRepository') private readonly PessoaRepository: typeof Pessoa,
    ) { }

    async findAll():Promise<Pessoa[]> {
        return await this.PessoaRepository.findAll<Pessoa>();
    }

    async findById(id:number): Promise<Pessoa> {
        return await this.PessoaRepository.findById(id);
    }

    async create (createPessoaDto : CreatePessoaDto): Promise<Pessoa> {
        return await this.PessoaRepository.create<Pessoa>(createPessoaDto);
    }

    async update(id: number, newValue: CreatePessoaDto): Promise<Pessoa | null> {

        let pessoa = await this.PessoaRepository.findById<Pessoa>(id);
    
        if (!pessoa) {
          throw new Error('Pessoa nao encontrada!');
        }
    
        pessoa = this._assign(pessoa, newValue);
    
        return await pessoa.save({ returning: true });
    }

    async delete (id : number): Promise<number> {
        return await this.PessoaRepository.destroy({
            where : {id},
        });
    }

    private _assign(pessoa: CreatePessoaDto, newValue: CreatePessoaDto): Pessoa {
        for (const key of Object.keys(pessoa['dataValues'])) {
          if (pessoa[key] !== newValue[key]) {
            pessoa[key] = newValue[key];
          }
        }
        return pessoa as Pessoa;
    }

} 

