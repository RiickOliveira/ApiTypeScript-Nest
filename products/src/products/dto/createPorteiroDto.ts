import { CreatePessoaDto } from "./createPessoaDto";
import { CreateUsuarioDto } from "./createUsuarioDto";

export class CreatePorteiroDto {
    
    readonly id:number;
    usuarioId : number;
    pessoaId: number;
    pessoa : CreatePessoaDto;
    usuario : CreateUsuarioDto;
    
}