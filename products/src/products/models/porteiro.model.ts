import { Table, Model, DataType, Column, DefaultScope, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Usuario } from "./usuario.model";
import { Pessoa } from "./pessoa.model";

@Table({
    schema: 'public',
    tableName: 'porteiro',
    timestamps: false,
    name:{
        singular:'porteiro',
        plural  :'porteiros'
    }
})
export class Porteiro extends Model<Porteiro> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id: number;

    //@BelongsTo(() => Usuario)
    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        field: 'usuario_id',
        allowNull: false,
        comment: 'Usuario associado ao condimino'
    })
    usuarioId : number;

   // 
    @ForeignKey(() => Pessoa)
    @Column({
        type: DataType.INTEGER,
        field: 'pessoa_id',
        allowNull: false,
        comment: 'Pessoa associado ao condimino'
    })
    pessoaId : number;

    @BelongsTo(() => Pessoa)
    pessoa : Pessoa;

    @BelongsTo(() => Usuario)
    usuario : Usuario;

}