import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put} from '@nestjs/common'
import { PorteiroService } from '../services/porteiro.service';
import { Porteiro } from '../models/porteiro.model';
import { CreatePorteiroDto } from '../dto/createPorteiroDto';
import { Digital } from 'src/util/util';

@Controller('porteiro')
export class PorteiroController {
    constructor(
        private readonly porteiroService: PorteiroService,
        private readonly digital: Digital
    ) { }

    @Get()
    async findAll (@Response() res): Promise<Porteiro[]> {
        let porteiros = await this.porteiroService.findAll();
        return res.status(200).json({data:porteiros})
    }

    @Get('/:id')
    public async findById (@Response() res, @Param() param) {
        const porteiro = await this.porteiroService.findById(param.id);
        return res.status(200).json({data: porteiro});
    }

    @Post()
    async create (@Response () res, @Body() payload: any) {
        
        payload.porteiro.usuario.desativado = false;
        payload.porteiro.usuario.tipo       = 1;
        payload.porteiro.usuario.criacao    = new Date();
        payload.porteiro.pessoa.criacao     = new Date();
        payload.porteiro.pessoa.digital     = this.digital.geraDigital()
        
        let porteiro = await this.porteiroService.create(payload.porteiro);
        return res.status(HttpStatus.OK).json({
            sucesso : true, 
            msg: 'incluido com exito', 
            data : porteiro
        });
    }

    @Put('/:id')
    async update (@Response() res,@Param() param, @Body() payload:any) {
        const porteiro = await this.porteiroService.update(param.id,payload.porteiro);
        return res.status(200).json({sucesso:true,data:porteiro})
    }

    @Delete('/:id')
    async delete(@Param() param,@Response() res) {
        await this.porteiroService.delete(param.id);
        return res.status(200).json({sucesso:true,msg:"Excluido com sucesso"})
    }
}