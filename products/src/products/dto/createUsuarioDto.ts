export class CreateUsuarioDto {
   
    readonly id: number;
    readonly email: string;
    readonly tipo: number;
    readonly senha: string;
    readonly desativado: boolean;
    readonly criacao: string;
    readonly token: string;
  }