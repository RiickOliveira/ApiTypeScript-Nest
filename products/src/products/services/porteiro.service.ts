import { Injectable, Inject} from '@nestjs/common'
import { Usuario } from '../models/usuario.model';
import { Pessoa } from '../models/pessoa.model';
import { Porteiro } from '../models/porteiro.model';
import { CreatePorteiroDto } from '../dto/createPorteiroDto';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class PorteiroService {
    constructor ( 
        @Inject ('PorteiroRepository') private readonly porteiroRepository : typeof Porteiro,
        @Inject ('UsuarioRepository') private readonly usuarioRepository : typeof Usuario,
        @Inject ('PessoaRepository') private readonly pessoaRepository : typeof Pessoa,
        @Inject ('SequelizeToken') private readonly sequelize
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
                    attributes : ['email','desativado','senha']
                }
            ]
        });
    }

    async create (createPorteiroDto : CreatePorteiroDto): Promise<Porteiro> {
        return await this.sequelize.transaction(async t => {
            
            const pessoa = await this.pessoaRepository.create<Pessoa>(createPorteiroDto.pessoa,{transaction:t});
            const usuario = await this.usuarioRepository.create<Usuario>(createPorteiroDto.usuario,{transaction:t});

            createPorteiroDto.pessoaId = pessoa.id;
            createPorteiroDto.usuarioId = usuario.id;

            return await this.porteiroRepository.create<Porteiro>(createPorteiroDto,{transaction:t});
        })
    } 

    async update (id:number , newValue:CreatePorteiroDto): Promise<Porteiro | null> {
        return await this.sequelize.transaction(async t => {
            
            let porteiro = await this.porteiroRepository.findById<Porteiro>(id);
            let port = porteiro.get({plain : true})
            
            if (!porteiro) {
                throw new Error('Porteiro nao encontrado!')
            }

            newValue.pessoaId = port.pessoaId;
            newValue.usuarioId = port.usuarioId;

            await this.usuarioRepository.update(newValue.usuario,{
                transaction : t,
                where : {
                    id : port.usuarioId
                }
            });

            await this.pessoaRepository.update(newValue.pessoa,{
                transaction :t,
                where : {
                    id : port.pessoaId
                }
            });

            porteiro = this._assign(porteiro,newValue)
            return await porteiro.save({returning:true,transaction:t})
        })    
    }

    async delete(id:number): Promise<number> {
        return this.sequelize.transaction(async t => {
            
            let porteiro = await this.porteiroRepository.findById<Porteiro>(id);
            let port = porteiro.get({plain : true})

            if (!porteiro) {
                throw new Error('Porteiro nao encontrado!');
            }
            
            await this.usuarioRepository.destroy({
                transaction :t,
                where : {
                    id : port.usuarioId
                }
            });
            await this.pessoaRepository.destroy({
                transaction : t,
                where : {
                    id : port.pessoaId
                }
            });
            
            return await this.porteiroRepository.destroy({
                transaction :t,
                where : {id}
            })
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