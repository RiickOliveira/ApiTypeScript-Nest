import { Table, Model, DataType, Column, DefaultScope, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Usuario } from "./usuario.model";
import { Pessoa } from "./pessoa.model";
import { Porteiro } from "./porteiro.model";
import { Condomino } from "./condomino.model";

@Table({
    schema: 'public',
    tableName: 'visita',
    timestamps: false,
    name:{
        singular:'visita',
        plural  :'visitas'
    }
})
export class Visita extends Model<Visita> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id: number;

    @ForeignKey(() => Porteiro)
    @Column({
        type: DataType.INTEGER,
        field: 'porteiro_id',
        allowNull: true,
        comment: 'Usuario associado ao condimino'
    })
    porteiroId : number;

   // 
    @ForeignKey(() => Pessoa)
    @Column({
        type: DataType.INTEGER,
        field: 'pessoa_id',
        allowNull: true,
        comment: 'Pessoa associado ao condimino'
    })
    pessoaId : number;

    @ForeignKey(() => Condomino)
    @Column({
        type: DataType.INTEGER,
        field: 'condomino_id',
        allowNull: false,
        comment: 'Usuario associado ao condimino'
    })
    condominoId : number;


    @Column({
        type: DataType.DATE,
        field: 'data_hora_reserva',
        allowNull: false,
        comment: 'Data e hora do agendamento da visita'
    })
    dataHoraReserva : Date;

    @Column({
        type: DataType.STRING(60),
        field: 'nome_convidado',
        allowNull: false,
        comment: 'Nome da pessoa convidado',
    })
    nomeConvidado : string;

    @Column({
        type: DataType.STRING(120),
        field: 'condomino_observacao',
        allowNull: true,
    })
    condominoObservacao : string;

    @Column({
        type: DataType.DATE,
        field: 'data_hora_expiracao',
        allowNull: true,
    })
    dataHoraExpiracao : Date;

    @Column({
        type: DataType.INTEGER,
        field: 'situacao',
        allowNull: true,
        comment: ''
    })
    situacao : number;

    @Column({
        type: DataType.DATE,
        field: 'portaria_data_hora_chegada',
        allowNull: true,
    })
    portariaDataHoraChegada : Date;

    @Column({
        type: DataType.STRING(120),
        field: 'portaria_observacao',
        allowNull: true,
    })
    portariaObservacao : string;

    @BelongsTo(() => Pessoa)
    pessoa : Pessoa;

    @BelongsTo(() => Porteiro)
    porteiro : Porteiro;

    @BelongsTo(() => Condomino)
    condomino : Condomino;


}