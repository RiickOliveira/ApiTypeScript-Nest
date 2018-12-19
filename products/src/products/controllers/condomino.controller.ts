import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put} from '@nestjs/common'
import { Condomino } from '../models/condomino.model';
import { CreateCondominoDto } from '../dto/createCondominoDto';
import { CondominoService } from '../services/condomino.service';

@Controller('condomino')
export class CondominoController {
    constructor(private readonly condominoService: CondominoService) { }

    @Get()
    async findAll (): Promise<Condomino[]> {
        return await this.condominoService.findAll();
    }

    @Get('/:id')
    public async findById (@Response() res, @Param() param) {
        const condomino = await this.condominoService.findById(param.id);
        return res.status(200).json({data: condomino});
    }

    @Post()
    async create (@Response () res, @Body() createCondominoDto: CreateCondominoDto) {
        await this.condominoService.create(createCondominoDto);
        return res.status(HttpStatus.OK).json({
            sucesso : true, 
            msg: 'incluido com exito', 
            data : createCondominoDto
        });
    }

    @Put('/:id')
    async update (@Response() res,@Param() param, @Body() body) {
        const condomino = await this.condominoService.update(param.id,body);
        return res.status(200).json({sucesso:true,data:condomino})
    }

    @Delete('/:id')
    async delete(@Param() param,@Response() res) {
        await this.condominoService.delete(param.id);
        return res.status(200).json({sucesso:true,msg:"Excluido com sucesso"})
    }
}