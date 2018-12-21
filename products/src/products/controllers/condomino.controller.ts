import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put} from '@nestjs/common'
import { Condomino } from '../models/condomino.model';
import { CreateCondominoDto } from '../dto/createCondominoDto';
import { CondominoService } from '../services/condomino.service';
import { Digital } from 'src/util/util'
import { Sequelize } from 'sequelize-typescript';

@Controller('condomino')
export class CondominoController {
    constructor(
        private readonly condominoService: CondominoService,
        private readonly digital: Digital
    ) { }

    @Get()
    async findAll (@Response() res): Promise<Condomino[]> {
        let condomino = await this.condominoService.findAll();
        return res.status(200).json({data:condomino})
    }

    @Get('/:id')
    public async findById (@Response() res, @Param() param) {
        const condomino = await this.condominoService.findById(param.id);
        return res.status(200).json({data: condomino});
    }

    @Post()
    async create (@Response () res, @Body() payload : any) {

        payload.condomino.usuario.desativado = false;
        payload.condomino.usuario.tipo       = 2;
        payload.condomino.usuario.criacao    = new Date();
        payload.condomino.pessoa.criacao     = new Date();
        payload.condomino.pessoa.digital     = this.digital.geraDigital()
        
        let condomino = await this.condominoService.create(payload.condomino);
        return res.status(HttpStatus.OK).json({
            sucesso : true, 
            msg: 'incluido com exito', 
            data : condomino
        });
    }

    @Put('/:id')
    async update (@Response() res, @Param() param, @Body() payload: any) {
        const condomino = await this.condominoService.update(param.id,payload.condomino);
        return res.status(200).json({sucesso:true,data:condomino})
    }

    @Delete('/:id')
    async delete(@Param() param,@Response() res) {
        await this.condominoService.delete(param.id);
        return res.status(200).json({sucesso:true,msg:"Excluido com sucesso"})
    }
}