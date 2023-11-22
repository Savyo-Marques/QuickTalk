import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private baseUrl = 'http://localhost:8080'
    private url = `${this.baseUrl}/usuario/login`

    /**
     * Construtor do serviço LoginService.
     * 
     * @constructor
     * @param {HttpClient} http - O cliente HTTP utilizado para realizar as requisições.
     */
    constructor(private http: HttpClient) {}

    /**
     * Método para autenticar um usuário.
     * 
     * @param {string} usuario - Nome de usuário para autenticação.
     * @param {string} senha - Senha associada ao usuário para autenticação.
     * @returns {Observable<any>} - Uma Observable contendo a resposta da solicitação de login.
     */
    login(usuario:string, senha:string): Observable<any>{
        return this.http.post(this.url, {usuario, senha});
    }
}
