import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { flyInOut } from 'src/app/animations';


import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-cadastrar-user',
    templateUrl: './cadastrar-user.component.html',
    styleUrls: ['./cadastrar-user.component.css'],
    animations: [flyInOut],
})

export class CadastrarUserComponent implements OnInit {
    btnValue = "Criar Conta"

    /**
     * Construtor do CadastroUsuarioComponent.
     * @param router - Serviço de roteamento para navegar entre as páginas.
     * @param userService - Serviço que lida com operações relacionadas a usuários.
     * @param menssage - Serviço de notificação Toastr para exibir mensagens de sucesso ou erro.
     */
    constructor(private router: Router, 
                private userService: UserService,      
                private menssage: ToastrService)  {}

    ngOnInit(): void {}

    /**
     * Método para receber e processar o formulário de cadastro de usuário.
     * @param usuario Objeto contendo informações do usuário a serem cadastradas.
     */
    async receberForm(usuario:Usuario){
        console.log("Formulario Recebido.")
        const formData = new FormData();

        formData.append("nome", usuario.nome);
        formData.append("senha", usuario.senha);
        formData.append("email", usuario.email);
        formData.append("descricao", usuario.descricao);

        if (usuario.avatar) {
            formData.append("avatar", usuario.avatar)
        }

        this.userService.cadastrarUser(formData).subscribe({
            next: (res: any) => {
                console.log(res);
                this.menssage.success("Cadastro realizado com sucesso.", undefined, {toastClass:'custom-toastr-message'});
                this.router.navigate([''])
            },
            error: (err: any) => {
                console.log(err);
                this.menssage.error("Erro no cadastro. Tente novamente mais tarde.", undefined, {toastClass:'custom-toastr-message'});
            }
        })
        
    }
}
