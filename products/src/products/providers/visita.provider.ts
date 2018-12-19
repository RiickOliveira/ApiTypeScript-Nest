import { Visita } from "src/products/models/visita.model";    

export const VisitaProviders = [
    {
        provide  : 'VisitaRepository',
        useValue : Visita
    },
];

