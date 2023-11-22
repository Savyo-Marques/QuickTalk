import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { flyInOut } from 'src/app/animations';

import { ConversasTesteService } from 'src/app/services/conversas-teste.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    animations: [flyInOut]
})

export class ChatComponent implements OnInit{
    opcaoEscolhida: string | null = null;
    divAberta!: boolean
    user!: FormGroup;
    
    constructor(public conversasService: ConversasTesteService, private menssage: ToastrService) {}

    ngOnInit(): void {
        this.user = new FormGroup ({
            nomeUsuario: new FormControl ("", [Validators.required]),
            nomeGrupo: new FormControl (" ", [Validators.required])
        })
    }

    get nomeUsuario() {
        return this.user.get('nomeUsuario')!;
    }

    get nomeGrupo() {
        return this.user.get('nomeGrupo')!;
    }

    mostrarDiv(id: string): void {
        this.opcaoEscolhida = id;
        this.divAberta = true
    }

    fecharDiv(){
        this.opcaoEscolhida = '';
        this.divAberta = false;
    }

    adicionarUser (){
        if(this.user.valid){
            const usuario = this.nomeUsuario.value;
            this.conversasService.checkUser(usuario).subscribe({
                next: (usuarioExistente: boolean) => {
                    if(usuarioExistente){
                        this.conversasService.addUser(usuario).subscribe({
                            next: (res: any) => {
                                //Operação bem-sucedida.
                                console.log(res);
                                this.menssage.success("Contato adicionado com sucesso.", undefined, {toastClass:'custom-toastr-message'});
                                this.user.reset();
                                },
                            error: (err: any) => {
                                //Trata erro ao adicionar usuário.
                                console.log(err);
                                this.menssage.error("Erro ao adicionar contato, tente novamente mais tarde.", undefined, {toastClass:'custom-toastr-message'});
                            }
                        });
                    } else {
                        //Trata inexistência do usuário.
                        this.menssage.error("Contato inexistente. Verifique o nome do usuário.", undefined, {toastClass:'custom-toastr-message'});
                    }
                },
                error: (err: any) => {
                    //Trata erro ao verificar a existência do usuário.
                    console.log (err);
                    this.menssage.error("Erro na verificação do contato, tente novamente mais tarde.", undefined, {toastClass:'custom-toastr-message'});
                }
            })
        }
    }

    criarGrupo(){

    }
}
