import { Table, Model, DataType, Column, DefaultScope, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Pessoa } from "./pessoa.model";
import { Condomino } from "./condomino.model";

@DefaultScope({
    include: [
        () => Condomino, 
        () => Pessoa
    ]
})

@Table({
    schema: 'public',
    tableName: 'condominoConvidado',
    timestamps: false,
    name:{
        singular:'condominoConvidado',
        plural  :'condominoConvidados'
    }
})
export class CondominoConvidado extends Model<CondominoConvidado> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id: number;

    //@BelongsTo(() => Usuario)
    @ForeignKey(() => Condomino)
    @Column({
        type: DataType.INTEGER,
        field: 'condomino_id',
        allowNull: false,
        comment: 'Usuario associado ao condimino'
    })
    condominoId : number;

   // 
    @ForeignKey(() => Pessoa)
    @Column({
        type: DataType.INTEGER,
        field: 'pessoa_id',
        allowNull: false,
        comment: 'Pessoa associado ao condimino'
    })
    pessoaId : number;

    @Column({
        type: DataType.BOOLEAN,
        field: 'favorito',
        allowNull: true,
    })
    favorito : boolean;

    @BelongsTo(() => Pessoa)
    pessoa : Pessoa;

    @BelongsTo(() => Condomino)
    condomino : Condomino;


}