import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { flyInOut } from 'src/app/animations';

import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-editar-user',
    templateUrl: './editar-user.component.html',
    styleUrls: ['./editar-user.component.css'],
    animations: [flyInOut]
})

export class EditarUserComponent implements OnInit {
    btnValor: string = "Editar";
    userForm!: Usuario;

    /**
     * Construtor do EditarUsuarioComponent
     * 
     * @param userService - Serviço que lida com operações de usuário.
     * @param route - Serviço para acessar os parâmetros da rota.
     * @param router - Serviço de navegação entre componentes.
     * @param message - Serviço de exibição de mensagens Toastr.
     */
    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private menssage: ToastrService) {}

    /** 
     * Método chamado na inicialização do componente.
     * Obtém as informações do usuário a ser editado.
     * 
     * @method ngOnInit
     */
    ngOnInit(): void {
        const idUser = Number(this.route.snapshot.paramMap.get("id"));

        this.userService.retornaInfoUser(idUser).subscribe(item => {
            this.userForm = item.data;
        })
    }

    /**
     * Método para editar as informações do usuário.
     * 
     * @param form O formulário com as informações editadas.
     */
    async editarDados(form: Usuario){
        console.log('Função chamada');
        
        const id = this.userForm.id;
        const userForm = new FormData();

        userForm.append("nome", form.nome);
        userForm.append("senha", form.senha);
        userForm.append("email", form.email);
        userForm.append("descricao", form.descricao);

        if (form.avatar) {
            userForm.append("avatar", form.avatar);
        }

        this.userService.atualizarInfoUser(id!, userForm).subscribe();

        if (form.email || form.senha) {
            this.menssage.success("Realize login novamente.", undefined, {toastClass:'custom-toastr-message'})
            this.router.navigate(['']);
        } else{
            this.menssage.success("Informações atualizadas com com sucesso.", undefined, {toastClass:'custom-toastr-message'})
            this.router.navigate(['chat']);
        }
        
    }

    /**
     * Método para deletar a conta do usuário.
     * 
     * @param id O ID do usuário cuja conta será excluída.
     */
    async deletarConta(id: number){
        console.log('Função chamada');

        this.userService.deletarContaUser(id).subscribe();
        this.menssage.success("Conta excluída com sucesso.", undefined, {toastClass:'custom-toastr-message'});
        this.router.navigate(['']);
    }
}
