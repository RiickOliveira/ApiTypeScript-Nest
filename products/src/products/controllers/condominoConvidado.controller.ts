import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put, Request, Query} from '@nestjs/common'
import { CondominoConvidadoService } from '../services/condominoConvidado.service';
import { CondominoConvidado } from '../models/condominoConvidado.model';
import { CreateCondominoConvidadoDto } from '../dto/createCondominoConvidadoDto';
import { Digital } from 'src/util/util'

@Controller('convidado')
export class ConvidadoController {
    constructor(
        private readonly convidadoService: CondominoConvidadoService,
        private readonly digital : Digital
    ) { }

    @Get()
    async findAll (@Request() req,@Response() res): Promise<CondominoConvidado[]> {
        if (req.query.condominoId && req.query.search) {
            let convidado = await this.convidadoService.findCondomino(req.query.condominoId,req.query.search)
            return res.status(200).json({data:convidado})
        } 
        
        if (req.query.condominoId) {
            let convidado = await this.convidadoService.findOneCondomino(req.query.condominoId)
            return res.status(200).json({data:convidado})
        }
        else {
           let convidados = await this.convidadoService.findAll();
            return res.status(200).json({data:convidados})
        }
    }

    @Get('/:id')
    public async findById (@Response() res, @Param() param) {
        const convidado = await this.convidadoService.findById(param.id);
        return res.status(200).json({data: convidado});
    }

    @Post()
    async create (@Response () res, @Body() payload:any,@Request() req) {
        
        payload.convidado.condominoId = payload.convidado.condominoId;
        payload.convidado.pessoa.digital = this.digital.geraDigital();
        payload.convidado.pessoa.criacao = new Date();
        
        let convidado = await this.convidadoService.create(payload.convidado);
        return res.status(HttpStatus.OK).json({
            sucesso : true, 
            msg: 'incluido com exito', 
            data : convidado
        });
    }

    @Put('/:id')
    async update (@Response() res,@Param() param, @Body() body) {
        const convidado = await this.convidadoService.update(param.id,body);
        return res.status(200).json({sucesso:true,data:convidado})
    }


    @Put('/:id/favoritaConvidado')
    async favorita (@Response() res,@Param() param, @Body() payload:any) {
        const convidado = await this.convidadoService.favoritaConvidado(param.id,payload);
        return res.status(200).json({sucesso:true,data:convidado})
    }

    @Delete('/:id')
    async delete(@Param() param,@Response() res) {
        await this.convidadoService.delete(param.id);
        return res.status(200).json({sucesso:true,msg:"Excluido com sucesso"})
    }
}