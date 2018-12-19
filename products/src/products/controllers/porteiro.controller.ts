import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put} from '@nestjs/common'
import { PorteiroService } from '../services/porteiro.service';
import { Porteiro } from '../models/porteiro.model';
import { CreatePorteiroDto } from '../dto/createPorteiroDto';

@Controller('porteiro')
export class PorteiroController {
    constructor(private readonly porteiroService: PorteiroService) { }

    @Get()
    async findAll (): Promise<Porteiro[]> {
        return await this.porteiroService.findAll();
    }

    @Get('/:id')
    public async findById (@Response() res, @Param() param) {
        const porteiro = await this.porteiroService.findById(param.id);
        return res.status(200).json({data: porteiro});
    }

    @Post()
    async create (@Response () res, @Body() createPorteiroDto: CreatePorteiroDto) {
        await this.porteiroService.create(createPorteiroDto);
        return res.status(HttpStatus.OK).json({
            sucesso : true, 
            msg: 'incluido com exito', 
            data : createPorteiroDto
        });
    }

    @Put('/:id')
    async update (@Response() res,@Param() param, @Body() body) {
        const porteiro = await this.porteiroService.update(param.id,body);
        return res.status(200).json({sucesso:true,data:porteiro})
    }

    @Delete('/:id')
    async delete(@Param() param,@Response() res) {
        await this.porteiroService.delete(param.id);
        return res.status(200).json({sucesso:true,msg:"Excluido com sucesso"})
    }
}