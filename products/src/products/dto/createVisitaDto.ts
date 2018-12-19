export class CreateVisitaDto {
    
    readonly id: number;
    porteiroId : number;
    condominoId: number;
    pessoaId:number;
    dataHoraReserva: Date;
    nomeConvidado: string;
    condominoObservacao: string;
    dataHoraExpiracao: Date;
    situacao: number;
    portariaDataHoraChegada: Date;
    portariaObservacao: string;

}