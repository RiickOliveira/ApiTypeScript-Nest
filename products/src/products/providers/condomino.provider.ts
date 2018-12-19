import { Condomino } from 'src/products/models/condomino.model';

export const CondominoProviders = [
    {
        provide  :'CondominoRepository',
        useValue : Condomino

    }
]