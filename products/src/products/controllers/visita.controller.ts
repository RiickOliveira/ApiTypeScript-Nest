import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put, Request} from '@nestjs/common'
import { VisitaService } from '../services/visita.service';
import { Visita } from '../models/visita.model';
import { CreateVisitaDto } from '../dto/createVisitaDto';
import { request } from 'https';

@Controller('visita')
export class VisitaController {
    constructor(private readonly visitaService: VisitaService) { }

    @Get()
    async findAll (@Response() res, @Request() req): Promise<Visita[]> {
        if (req.query.where) {
            let visitas = await this.visitaService.findVisita(req.query.where);
            return res.status(200).json({sucesso:true,data:visitas})
        }
        if (req.query.visita) {
            let visitas = await this.visitaService.findOneVisita(req.query.visita);
            return res.status(200).json({sucesso:true,data:visitas})
        } else {
            let visitas = await this.visitaService.findAll();
            return res.status(200).json({sucesso:true,data:visitas})
        }
    }   

    @Get('/:id')
    public async findById (@Response() res, @Param() param) {
        const visita = await this.visitaService.findById(param.id);
        
        if (!visita) {
            res.status(404).json({sucesso:false, msg:"Visita nao encontrada"})
            return;
        }
        return res.status(200).json({sucesso:true,data: visita});
    }

    @Post()
    async create (@Response () res, @Body() payload: any) {
        
        payload.visita.situacao = 1;
        
        let visita = await this.visitaService.create(payload.visita);
        return res.status(HttpStatus.OK).json({
            sucesso : true, 
            msg: 'incluido com exito', 
            data : visita
        });
    }

    @Put('/:id')
    async update (@Response() res, @Body() payload:any, @Param() param) {
        const visita = await this.visitaService.update(param.id, payload.visita);
        return res.status(200).json({sucesso:true,data:visita})
    }

    @Put('/:id/updatePessoa')
    async updateIdVisita (@Response() res, @Body() payload:any, @Param() param) {
        console.log(payload)
        payload.pessoaId = payload.pessoaId
        const visita = await this.visitaService.updateIdVisita(param.id, payload.pessoaId);
        return res.status(200).json({sucesso:true,data:visita})
    }

    @Delete('/:id')
    async delete (@Response() res, @Param() param) {
        await this.visitaService.delete(param.id);
        return res.status(200).json({sucesso:true,msg:'Visita excluida com sucesso'})
    }

}