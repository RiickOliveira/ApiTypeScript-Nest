import { Injectable, Inject} from '@nestjs/common'
import { CreateCondominoDto } from '../dto/createCondominoDto'
import { Condomino } from '../models/condomino.model';
import { Usuario } from '../models/usuario.model';
import { Pessoa } from '../models/pessoa.model';

@Injectable()
export class CondominoService {
    constructor (
        @Inject ('CondominoRepository') private readonly CondominoRepository: typeof Condomino,
        @Inject ('UsuarioRepository') private readonly usuarioRepository: typeof Usuario,
        @Inject ('PessoaRepository') private readonly pessoaRepository: typeof Pessoa
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
                    attributes:['email','desativado']
                }
            ]
        });
    }

    async create (createCondominoDto : CreateCondominoDto): Promise<Condomino> {
        const usuario = await this.usuarioRepository.create<Usuario>(createCondominoDto.usuario)
        const pessoa = await this.pessoaRepository.create<Pessoa>(createCondominoDto.pessoa)
        
        createCondominoDto.usuarioId = usuario.id;
        createCondominoDto.pessoaId = pessoa.id;
            
        return await this.CondominoRepository.create<Condomino>(createCondominoDto);
    }

    async update (id:number, newValue:CreateCondominoDto): Promise<Condomino | null> {
        let condomino = await this.CondominoRepository.findById<Condomino>(id);
        
        if (!condomino) {
            console.error('CONDOMINO NAO EXISTE')
           return;
        }

        condomino.usuario.update(newValue.usuario);
        condomino.pessoa.update(newValue.pessoa);

        condomino = this._assign(condomino, newValue);
        return await condomino.save({returning:true})        
        
    }

    async delete (id:number): Promise<number> {
        let condomino = await this.CondominoRepository.findById<Condomino>(id);

        await condomino.usuario.destroy();
        await condomino.pessoa.destroy();
        
        return await this.CondominoRepository.destroy({
            where : {id}
        })
    }

    private _assign(pessoa: CreateCondominoDto , newValue: CreateCondominoDto): Condomino {
        for (const key of Object.keys(pessoa['dataValues'])) {
          if (pessoa[key] !== newValue[key]) {
            pessoa[key] = newValue[key];
          }
        }
        return pessoa as Condomino;
    }
}