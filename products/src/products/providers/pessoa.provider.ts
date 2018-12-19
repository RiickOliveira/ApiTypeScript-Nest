import { Pessoa } from '../models/pessoa.model';

export const PessoaProviders = [
    {
        provide: 'PessoaRepository',
        useValue: Pessoa,
    },
];