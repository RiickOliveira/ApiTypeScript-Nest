import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CondominoService } from 'src/products/services/condomino.service';
import { CondominoProviders } from 'src/products/providers/condomino.provider';
import { PorteiroService } from 'src/products/services/porteiro.service';
import { PorteiroProviders } from 'src/products/providers/porteiro.provider';
import { UsuarioService } from 'src/products/services/usuario.service';
import { UsuarioProviders } from 'src/products/providers/usuario.provider';
import { CondominoController } from 'src/products/controllers/condomino.controller';
import { PorteiroController } from 'src/products/controllers/porteiro.controller';
import { ProductsModule } from 'src/products/products.module';
import { PessoaService } from 'src/products/services/pessoa.service';
import { PessoaProviders } from 'src/products/providers/pessoa.provider';
import { PessoaController } from 'src/products/controllers/pessoa.controller';
import { Digital } from 'src/util/util';
import { databaseProviders } from 'src/database/database.providers';

@Module({
    imports : [Digital,ProductsModule],
    controllers: [
        AuthController,
        CondominoController,
        PorteiroController,
        PessoaController
    ],
    providers: [
        AuthService,
        CondominoService, ...CondominoProviders,
        PorteiroService,...PorteiroProviders,
        UsuarioService,...UsuarioProviders,
        PessoaService,...PessoaProviders,
        Digital,

    ],
})
export class AuthModule {}