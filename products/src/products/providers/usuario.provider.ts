import { Usuario } from "src/products/models/usuario.model";    

export const UsuarioProviders = [
    {
        provide  : 'UsuarioRepository',
        useValue : Usuario
    },
];

