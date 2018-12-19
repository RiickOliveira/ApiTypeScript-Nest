import { CreatePessoaDto } from "./createPessoaDto";

export class CreateCondominoConvidadoDto {
    
    readonly id: number;
    condominoId : number;
    pessoaId: number;
    readonly favorito: boolean;
    pessoa: CreatePessoaDto;
}