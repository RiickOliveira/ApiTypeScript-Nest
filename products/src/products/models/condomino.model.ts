import { Table, Model, DataType, Column, DefaultScope, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Usuario } from "./usuario.model";
import { Pessoa } from "./pessoa.model";


@Table({
    schema: 'public',
    tableName: 'condomino',
    timestamps: false,
    name:{
        singular:'condomino',
        plural  :'condominos'
    }
})
export class Condomino extends Model<Condomino> {
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

    @Column({
        type: DataType.STRING(80),
        field: 'endereco',
        allowNull: false,
        comment: 'Endereço, ex. apt 101, quadra 15, etc.'
    })
    endereco : string;

    @BelongsTo(() => Pessoa)
    pessoa : Pessoa;

    @BelongsTo(() => Usuario)
    usuario : Usuario;


}