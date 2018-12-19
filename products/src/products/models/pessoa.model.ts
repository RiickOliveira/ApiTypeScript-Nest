import { Table , Model, Column, DataType} from 'sequelize-typescript'

@Table({
    schema: 'public',
    tableName: 'pessoa',
    timestamps: false,
    name:{
        singular:'pessoa',
        plural  :'pessoas'
    }
})
export class Pessoa extends Model<Pessoa> {
    
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        field: 'id',
    })
    id: number;
    
    @Column({
        type: DataType.STRING(60),
        field: 'nome',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    nome: string;

    @Column({
        type: DataType.BIGINT,
        field: 'cpf',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    cpf: number;

    @Column({
        type: DataType.DATE,
        field: 'nascimento',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    nascimento: string;
    
    @Column({
        type: DataType.STRING(60),
        field: 'digital',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    digital: string;

    @Column({
        type: DataType.STRING(60),
        field: 'endereco_logradouro',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    enderecoLogradouro: string;    

    @Column({
        type: DataType.STRING(60),
        field: 'endereco_numero',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    enderecoNumero: string;    

    @Column({
        type: DataType.STRING(60),
        field: 'endereco_bairro',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    enderecoBairro: string;    

    @Column({
        type: DataType.STRING(60),
        field: 'endereco_cidade',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    enderecoCidade: string;    

    @Column({
        type: DataType.STRING(60),
        field: 'endereco_uf',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    enderecoUf: string;  
    
    @Column({
        type: DataType.DATE,
        field: 'criacao',
        allowNull: false,
        comment: 'Nome da pessoa',
    })
    criacao: string;    
    
}