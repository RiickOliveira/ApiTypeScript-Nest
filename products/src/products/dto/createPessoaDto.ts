export class CreatePessoaDto {
   
    readonly id: number;
    readonly nome: string;
    readonly cpf: number;
    readonly nascimento: string;
    readonly digital: string;
    readonly enderecoLogradouro: string;
    readonly enderecoNumero: string;
    readonly enderecoBairro: string;
    readonly enderecoCidade: string;
    readonly enderecoUf: string;
    criacao: string;
  }