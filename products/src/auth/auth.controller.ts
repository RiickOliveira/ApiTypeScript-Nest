import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    public async login(@Body() body, @Res() res) {
        if (!body) throw new Error('auth:login:missingInformation');
        if (!body.email) throw new Error('auth:login:missingEmail');
        if (!body.senha) throw new Error('auth:login:missingPassword');
        console.log(body)

        /*const token = await this.authService.sign(body);
        res.status(200).json('Bearer ' + token);*/
        const usuario = await this.authService.sign(body);
        res.status(200).json({data: usuario});
    }
}