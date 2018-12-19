import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put} from '@nestjs/common'
import { VisitaService } from '../services/visita.service';
import { Visita } from '../models/visita.model';
import { CreateVisitaDto } from '../dto/createVisitaDto';

@Controller('visita')
export class VisitaController {
    constructor(private readonly visitaService: VisitaService) { }

    @Get()
    async findAll (): Promise<Visita[]> {
        return await this.visitaService.findAll();
    }

    @Get('/:id')
    public async findById (@Response() res, @Param() param) {
        const visita = await this.visitaService.findById(param.id);
        
        if (!visita) {
            res.status(404).json({sucesso:false, msg:"Visita nao encontrada"})
            return;
        }
        return res.status(200).json({data: visita});
    }

    @Post()
    async create (@Response () res, @Body() createVisitaDto: CreateVisitaDto) {
        await this.visitaService.create(createVisitaDto);
        return res.status(HttpStatus.OK).json({
            sucesso : true, 
            msg: 'incluido com exito', 
            data : createVisitaDto
        });
    }

    @Put('/:id')
    async update (@Response() res, @Body() body, @Param() param) {
        const visita = await this.visitaService.update(param.id, body);
        return res.status(200).json({sucesso:true,data:visita})
    }

    @Delete('/:id')
    async delete (@Response() res, @Param() param) {
        await this.visitaService.delete(param.id);
        return res.status(200).json({sucesso:true,msg:'Visita excluida com sucesso'})
    }

}