import { Injectable, Inject} from '@nestjs/common'
import { Usuario } from '../models/usuario.model';
import { Pessoa } from '../models/pessoa.model';
import { Porteiro } from '../models/porteiro.model';
import { CreatePorteiroDto } from '../dto/createPorteiroDto';

@Injectable()
export class PorteiroService {
    constructor ( 
        @Inject ('PorteiroRepository') private readonly porteiroRepository : typeof Porteiro,
        @Inject ('UsuarioRepository') private readonly usuarioRepository : typeof Usuario,
        @Inject ('PessoaRepository') private readonly pessoaRepository : typeof Pessoa,
    ) {}

    async findAll(): Promise<Porteiro[]> {
        return await this.porteiroRepository.findAll<Porteiro>({
            include : [
                {
                    model : Pessoa
                },
                {
                    model : Usuario,
                    attributes : ['email','desativado']
                }
            ]
        });
    }

    async findById(id:number): Promise<Porteiro> {
        return await this.porteiroRepository.findById(id,{
            include : [
                {
                    model : Pessoa
                },
                {
                    model : Usuario,
                    attributes : ['email','desativado']
                }
            ]
        });
    }

    async create (createPorteiroDto : CreatePorteiroDto): Promise<Porteiro> {
        const pessoa = await this.pessoaRepository.create<Pessoa>(createPorteiroDto.pessoa);
        const usuario = await this.usuarioRepository.create<Usuario>(createPorteiroDto.usuario);

        createPorteiroDto.pessoaId = pessoa.id;
        createPorteiroDto.usuarioId = usuario.id;

        return await this.porteiroRepository.create<Porteiro>(createPorteiroDto);
    } 

    async update (id:number , newValue:CreatePorteiroDto): Promise<Porteiro | null> {
        let porteiro = await this.porteiroRepository.findById<Porteiro>(id);
        
        if (!porteiro) {
            console.error('PORTEIRO NAO EXISTE')
           return;
        }

        porteiro.usuario.update(newValue.usuario);
        porteiro.pessoa.update(newValue.pessoa);

        porteiro = this._assign(porteiro,newValue)
        return await porteiro.save({returning:true})
    }

    async delete(id:number): Promise<number> {
        let porteiro = await this.porteiroRepository.findById<Porteiro>(id);

        await porteiro.usuario.destroy();
        await porteiro.pessoa.destroy();
        
        return await this.porteiroRepository.destroy({
            where : {id}
        })
    }

    private _assign(porteiro: CreatePorteiroDto , newValue: CreatePorteiroDto): Porteiro {
        for (const key of Object.keys(porteiro['dataValues'])) {
          if (porteiro[key] !== newValue[key]) {
            porteiro[key] = newValue[key];
          }
        }
        return porteiro as Porteiro;
    }
}