import { Module , RequestMethod} from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PessoaService } from './services/pessoa.service';
import { PessoaProviders } from './providers/pessoa.provider';
import { PessoaController } from './controllers/pessoa.controller';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { UsuarioProviders } from './providers/usuario.provider';
import { CondominoController } from './controllers/condomino.controller';
import { CondominoService } from './services/condomino.service';
import { CondominoProviders } from './providers/condomino.provider';
import { PorteiroController } from './controllers/porteiro.controller';
import { PorteiroProviders } from './providers/porteiro.provider';
import { PorteiroService } from './services/porteiro.service';
import { CondominoConvidadoService } from './services/condominoConvidado.service';
import { CondominoConvidadoProviders } from './providers/condominoConvidado.provider';
import { ConvidadoController } from './controllers/condominoConvidado.controller';
import { VisitaService } from './services/visita.service';
import { VisitaController } from './controllers/visita.controller';
import { VisitaProviders } from './providers/visita.provider';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { AuthMiddleware } from '../auth/middlewares/auth.middlewares';
import { Digital } from 'src/util/util';
import { AuthModule } from 'src/auth/auth.module';
import { AuthController } from 'src/auth/auth.controller';

@Module({
    imports : [DatabaseModule,Digital],
    controllers : [
        PessoaController,
        UsuarioController,
        CondominoController,
        PorteiroController,
        ConvidadoController,
        VisitaController,
    ],
    providers : [
        PessoaService, ...PessoaProviders,
        UsuarioService, ...UsuarioProviders,
        CondominoService, ...CondominoProviders,
        PorteiroService,...PorteiroProviders,
        CondominoConvidadoService,...CondominoConvidadoProviders,
        VisitaService,...VisitaProviders,
        Digital
    ],
    
})
export class ProductsModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/visita', method: RequestMethod.GET },
                { path: '/visita/:id', method: RequestMethod.GET },
                { path: '/visita/:id', method: RequestMethod.PUT },
                { path: '/visita/:id', method: RequestMethod.DELETE },

                { path: '/usuario', method: RequestMethod.GET },
                { path: '/usuario/:id', method: RequestMethod.GET },
                { path: '/usuario/:id', method: RequestMethod.PUT },
                { path: '/usuario/:id', method: RequestMethod.DELETE },

                { path: '/condomino', method: RequestMethod.GET },
                { path: '/condomino/:id', method: RequestMethod.GET },
                { path: '/condomino/:id', method: RequestMethod.PUT },
                { path: '/condomino/:id', method: RequestMethod.DELETE },

                { path: '/convidado', method: RequestMethod.GET },
                { path: '/convidado/:id', method: RequestMethod.GET },
                { path: '/convidado/:id', method: RequestMethod.PUT },
                { path: '/convidado/:id', method: RequestMethod.DELETE },

                { path: '/porteiro', method: RequestMethod.GET },
                { path: '/porteiro/:id', method: RequestMethod.GET },
                { path: '/porteiro/:id', method: RequestMethod.PUT },
                { path: '/porteiro/:id', method: RequestMethod.DELETE },

                { path: '/pessoa', method: RequestMethod.GET },
                { path: '/pessoa/:id', method: RequestMethod.GET },
                { path: '/pessoa/:id', method: RequestMethod.PUT },
                { path: '/pessoa/:id', method: RequestMethod.DELETE }
            );
    }
}
