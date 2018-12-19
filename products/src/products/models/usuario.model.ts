import { Table , Model, Column, DataType} from 'sequelize-typescript'

@Table({
    schema: 'public',
    tableName: 'usuario',
    timestamps: false,
    name:{
        singular:'usuario',
        plural  :'usuarios'
    }
})
export class Usuario extends Model<Usuario>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id: number;
    
    @Column({
        type: DataType.STRING(80),
        field: 'email',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    email: string;

    @Column({
        type: DataType.INTEGER,
        field: 'tipo',
        allowNull: false,
        comment: 'Tipo da pessoa(ADMINISTRADOR,CONDOMINO,PORTEIRO)',
    })
    tipo: number;

    @Column({
        type: DataType.STRING(32),
        field: 'senha',
        allowNull: false,
        comment: 'Senha'
    })
    senha: string;

    @Column({
        type: DataType.BOOLEAN,
        field: 'desativado',
        allowNull: false,
        comment: 'Tipo da pessoa'
    })
    desativado: boolean;

    @Column({
        type: DataType.DATE,
        field: 'criacao',
        allowNull: true,
        comment: 'Tipo da pessoa'
    })
    criacao: string;

    @Column({
        type: DataType.STRING(512),
        field: 'token',
        allowNull: true,
        comment: 'token para validacao do usuario'
    })
    token: string;

    
}