import { CreatePessoaDto } from "./createPessoaDto";
import { CreateUsuarioDto } from "./createUsuarioDto";

export class CreateCondominoDto {
    
    readonly id:number;
    usuarioId : number;
    pessoaId: number;
    readonly endereco: string;
    pessoa : CreatePessoaDto;
    usuario : CreateUsuarioDto;
    
}