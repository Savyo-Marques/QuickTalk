import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { flyInOut } from 'src/app/animations';

import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [flyInOut]
})
export class LoginComponent implements OnInit {
    // FormGroup para gerenciar o estado e validação dos campos de login
    loginForm!: FormGroup

    /**
     * Construtor do LoginComponent.
     *
     * @constructor
     * @param {LoginService} loginService - Serviço para autenticação do usuário.
     * @param {ToastrService} messagesInfo - Serviço para exibir mensagens informativas/toastr.
     * @param {Router} route - Serviço de roteamento para navegação entre páginas.
     */
    constructor(private loginService: LoginService, 
                private messagesInfo: ToastrService, 
                private route: Router) {}

    /**
     * Método chamado na inicialização do componente.
     * Inicializa o FormGroup com os campos de usuário e senha.
     *
     * @method ngOnInit
     */
    ngOnInit(): void {
        this.loginForm = new FormGroup({
            usuario: new FormControl ('', [Validators.required, Validators.email]),
            senha: new FormControl ('', [Validators.required, Validators.minLength(8)])
        })
    }

    /**
     * Getter para obter o controle do campo de usuário.
     *
     * @readonly
     * @type {FormControl}
     */
    get usuario() {
        return this.loginForm.get('usuario')!;
    }

    /**
     * Getter para obter o controle do campo de senha.
     *
     * @readonly
     * @type {FormControl}
     */
    get senha() {
        return this.loginForm.get('senha')!;
    }

    /**
     * Método chamado ao pressionar o botão de login.
     * Chama o serviço de login para autenticar o usuário.
     *
     * @method efetuarLogin
     */
    efetuarLogin() {
        const {usuario, senha} = this.loginForm.value;
        this.loginService.login(usuario, senha).subscribe({
            next: (res: any) => {
                if (res) {
                    //Operação bem-sucedida.
                    console.log(res);
                    this.messagesInfo.success("Login efetuado com sucesso.", undefined, {toastClass:'custom-toastr-message'});
                    this.loginForm.reset();
                    this.route.navigate(['chat']);
                } else {
                    //Login e senha não encontrado.
                    this.messagesInfo.error("Verifique email e senha.", undefined, {toastClass: 'custom-toastr-message'});
                }
            },
            error: (err: any) => {
                console.log(err);
                if (err.status === 401 || err.error && err.error.status === 401) {
                    //Falha na autentificação.
                    this.messagesInfo.error("Verifique email e senha.", undefined, {toastClass:'custom-toastr-message'});
                } else {
                    //Qualquer outro erro.
                    this.messagesInfo.error("Erro no login. Tente novamente.", undefined, {toastClass:'custom-toastr-message'});
                }
            }
        })
    }
}
