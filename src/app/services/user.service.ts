import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../interfaces/usuario';
import { Resposta } from '../interfaces/resposta';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private baseUrl = 'http://localhost:8080'
    private api = `${this.baseUrl}/usuario`

    /**
     * Cria uma instância do serviço UserService.
     *
     * @constructor
     * @param {HttpClient} http - O cliente HTTP utilizado para realizar as requisições.
     */
    constructor(private http: HttpClient) {}

    /**
     * Realiza o cadastro de um novo usuário na aplicação.
     *
     * @method cadastrarUser
     * @param {FormData} formData - Os dados do formulário a serem enviados para o servidor.
     * @return {Observable<FormData>} - Um Observable que contém os dados do usuário cadastrado.
     */
    cadastrarUser (formData: FormData): Observable<FormData>{
        return this.http.post<FormData>(this.api, formData)
    }

    /**
     * Recupera as informações de um usuário específico com base no ID.
     *
     * @method retornaInfoUser
     * @param {number} id - O ID do usuário a ser recuperado.
     * @return {Observable<Resposta<Usuario>>} - Um Observable que contém as informações do usuário.
     */
    retornaInfoUser(id: number): Observable<Resposta<Usuario>>{
        const urlUser = `${this.api}/${id}`;
        return this.http.get<Resposta<Usuario>>(urlUser);
    }

    /**
     * Atualiza as informações de um usuário existente com base no ID.
     *
     * @method atualizarInfoUser
     * @param {number} id - O ID do usuário a ser atualizado.
     * @param {FormData} userForm - Os novos dados do usuário a serem enviados para o servidor.
     * @return {Observable<FormData>} - Um Observable que contém os dados atualizados do usuário.
     */
    atualizarInfoUser(id: number, userForm: FormData): Observable<FormData>{
        const url = `${this.api}/${id}`;
        return this.http.put<FormData>(url, userForm);
    }

    /**
     * Deleta a conta de um usuário com base no ID.
     *
     * @method deletarContaUser
     * @param {number} id - O ID do usuário cuja conta será excluída.
     * @return {Observable<any>} - Um Observable que representa o resultado da operação de exclusão.
     */
    deletarContaUser(id: number): Observable<any> {
        const urlUser = `${this.api}/${id}`;
        return this.http.delete(urlUser);
    }

}
