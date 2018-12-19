import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put, Request} from '@nestjs/common'
import { CondominoConvidadoService } from '../services/condominoConvidado.service';
import { CondominoConvidado } from '../models/condominoConvidado.model';
import { CreateCondominoConvidadoDto } from '../dto/createCondominoConvidadoDto';

@Controller('convidado')
export class ConvidadoController {
    constructor(private readonly convidadoService: CondominoConvidadoService) { }

    @Get()
    async findAll (): Promise<CondominoConvidado[]> {
        return await this.convidadoService.findAll();
    }

    @Get('/:id')
    public async findById (@Response() res, @Param() param) {
        const convidado = await this.convidadoService.findById(param.id);
        return res.status(200).json({data: convidado});
    }

    @Post()
    async create (@Response () res, @Body() createconvidado: CreateCondominoConvidadoDto,@Request() req) {
        createconvidado.condominoId = req.body.condominoId;
        
        await this.convidadoService.create(createconvidado);
        return res.status(HttpStatus.OK).json({
            sucesso : true, 
            msg: 'incluido com exito', 
            data : createconvidado
        });
    }

    @Put('/:id')
    async update (@Response() res,@Param() param, @Body() body) {
        const convidado = await this.convidadoService.update(param.id,body);
        return res.status(200).json({sucesso:true,data:convidado})
    }

    @Delete('/:id')
    async delete(@Param() param,@Response() res) {
        await this.convidadoService.delete(param.id);
        return res.status(200).json({sucesso:true,msg:"Excluido com sucesso"})
    }
}