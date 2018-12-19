import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put} from '@nestjs/common'
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { CreateUsuarioDto } from '../dto/createUsuarioDto';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService : UsuarioService) { }

    @Get()
    async findAll () : Promise<Usuario[]> {
        return await this.usuarioService.findAll()
    }

    @Get('/:id')
    async findById(@Response() res, @Param() param) {
        const usuario = await this.usuarioService.findById(param.id);
        return res.status(200).json({data:usuario})
    }

    @Post()
    async create (@Response() res, @Body() createUsuarioDto:CreateUsuarioDto) {
        await this.usuarioService.create(createUsuarioDto);
        return res.status(201).json({
            sucesso: true,
            msg: 'Usuario criado com sucesso',
            data: createUsuarioDto
        });
    }

    @Put('/:id')
    async update (@Response() res, @Body() body, @Param() param) {
        const usuario = await this.usuarioService.update(param.id, body);
        return res.status(200).json({sucesso:true,data:usuario})
    }

    @Delete('/:id')
    async delete (@Response() res, @Param() param) {
        await this.usuarioService.delete(param.id);
        return res.status(200).json({sucesso:true,msg:'Usuario excluido com sucesso'})
    }

}