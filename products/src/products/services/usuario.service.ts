import { Injectable, Inject} from '@nestjs/common'
import { Usuario } from '../models/usuario.model';
import { CreateUsuarioDto } from '../dto/createUsuarioDto'

@Injectable()
export class UsuarioService {
    constructor(
        @Inject ('UsuarioRepository') private readonly usuarioRepository : typeof Usuario
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.findAll<Usuario>();
    }

    async findById(id: number): Promise<Usuario> {
        return await this.usuarioRepository.findById(id);
    }

    async create (createUsuarioDto : CreateUsuarioDto): Promise<Usuario> {
        return await this.usuarioRepository.create<Usuario>(createUsuarioDto);
    }

    async update(id: number, newValue: CreateUsuarioDto): Promise<Usuario | null> {

        let usuario = await this.usuarioRepository.findById<Usuario>(id);
    
        if (!usuario) {
            throw new Error('Usuario nao encontrado!');
        }
    
        usuario = this._assign(usuario, newValue);
    
        return await usuario.save({ returning: true });
    }

    async delete(id:number): Promise<Number> {
        return await this.usuarioRepository.destroy({
            where : {id},
        })
    }

    private _assign(usuario: CreateUsuarioDto, newValue: CreateUsuarioDto): Usuario {
        for (const key of Object.keys(usuario['dataValues'])) {
          if (usuario[key] !== newValue[key]) {
            usuario[key] = newValue[key];
          }
        }
        return usuario as Usuario;
    }


}