import { Porteiro } from 'src/products/models/porteiro.model';

export const PorteiroProviders = [
    {
        provide  :'PorteiroRepository',
        useValue : Porteiro

    }
]