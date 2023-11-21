import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from 'src/app/interfaces/usuario';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit  {
    @Output() onSubmit = new EventEmitter<Usuario>();
    @Input() btnValue!: string;
    @Input() form: Usuario | null = null;

    userForm!: FormGroup;

    ngOnInit(): void {
        this.userForm = new FormGroup ({
            id: new FormControl (this.form ? this.form.id: " "),
            nome: new FormControl (this.form ? this.form.nome : " ",  [Validators.required, Validators.minLength(5)]),    
            email: new FormControl (this.form ? this.form.email: " ",  [Validators.required, Validators.email]),
            senha: new FormControl (this.form ? this.form.senha: " ",  [Validators.required, Validators.minLength(8)]),
            descricao: new FormControl (this.form ? this.form.descricao: " ",  [Validators.required, Validators.minLength(6)]),
            avatar: new FormControl (" ")
        });
    }

    get nome () {
        return this.userForm.get('nome')!;
    }

    get email () {
        return this.userForm.get('email')!;
    }

    get senha () {
        return this.userForm.get('senha')!;
    }

    get avatar () {
        return this.userForm.get('avatar')!;
    }

    get descricao () {
        return this.userForm.get('descricao')!;
    }

    //Adiciona o arquivo de foto no formulário
    fileSelecionado (event : any) {
        const file: File = event.target.files[0];

        this.userForm.patchValue({avatar : file});
    }

    cadastrarDados () {
        if (this.userForm.invalid) {
            return;
        }
        
        console.log("Formulário enviado!");
        console.log(this.userForm.value);

        this.onSubmit.emit(this.userForm.value);
    }
}
