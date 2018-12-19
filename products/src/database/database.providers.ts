import { Sequelize } from 'sequelize-typescript';
import { Pessoa } from 'src/products/models/pessoa.model';
import { Usuario } from 'src/products/models/usuario.model'
import { Condomino } from 'src/products/models/condomino.model'
import { CondominoConvidado } from 'src/products/models/condominoConvidado.model';
import { Porteiro } from 'src/products/models/porteiro.model';
import { Visita } from 'src/products/models/visita.model'; 

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize({
        operatorsAliases: false,
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456789',
        database: 'AloPorteiro',
      });
      sequelize.addModels([
          Pessoa,
          Usuario,
          Condomino,
          CondominoConvidado,
          Porteiro,
          Visita
        ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];