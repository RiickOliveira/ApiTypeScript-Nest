import { Controller, Get , Post, Body, Response , HttpStatus, Delete, Param, Put} from '@nestjs/common'
import { Pessoa } from '../models/pessoa.model';
import { CreatePessoaDto } from '../dto/createPessoaDto';
import { PessoaService } from '../services/pessoa.service';

@Controller('pessoa')
export class PessoaController {
    constructor(private readonly pessoaService: PessoaService) { }

    @Get()
    async findAll (): Promise<Pessoa[]> {
        return await this.pessoaService.findAll();
    }

    @Get('/:id')
    public async findById (@Response() res, @Param() param) {
        const pessoa = await this.pessoaService.findById(param.id);
        return res.status(200).json({data: pessoa});
    }

    @Post()
    async create (@Response () res, @Body() createPessoaDto: CreatePessoaDto) {
        await this.pessoaService.create(createPessoaDto);
        return res.status(HttpStatus.OK).json({
            sucesso : true, 
            msg: 'incluido com exito', 
            data : createPessoaDto
        });
    }

    @Put('/:id')
    public async update (@Param() param, @Response() res, @Body() body) {
        const product = await this.pessoaService.update(param.id, body);
        return res.status(200).json({sucesso:true,data:product})
    }

    @Delete('/:id')
    public async delete(@Param() param, @Response() res) {
        await this.pessoaService.delete(param.id);
        return res.status(200).json({
            sucesso: true,
            msg : 'Excluido com sucesso'
        })
    }   
}