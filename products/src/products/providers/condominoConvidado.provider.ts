import { CondominoConvidado } from 'src/products/models/condominoConvidado.model';

export const CondominoConvidadoProviders = [
    {
        provide  :'CondominoConvidadoRepository',
        useValue : CondominoConvidado

    }
]