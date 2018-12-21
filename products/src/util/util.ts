import { Injectable } from "@nestjs/common";

@Injectable()
export class Digital {

	public geraDigital() {
		
		var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var numeros = '0123456789'
		var aleatorio:string = '';
		for (var i = 0; i < 5; i++)	{
		
			if (i < 2){
				var rnum = Math.floor(Math.random() * letras.length);
				aleatorio += letras.substring(rnum, rnum + 1);
			} else if (i > 2){
				var rnum = Math.floor(Math.random() * numeros.length);
				aleatorio += numeros.substring(rnum, rnum + 1);
			}else {
				aleatorio += '-';
			}
		}
		
		return aleatorio;
    }
}
		
    