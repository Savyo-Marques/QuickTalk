import { Injectable } from '@angular/core';
import { Observable, delay, of, timeout } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ConversasTesteService {
    private users: string[] = ['jose', 'paulo', 'rafael']
    private listaUser: string[] = []

    checkUser(usuario: string): Observable<boolean>{
        const existe = this.users.includes(usuario);
        return of(existe).pipe(delay(1000));
    }

    addUser(contato: string): Observable<any>{
        this.listaUser.push(contato)
        return of({ success: true }).pipe(delay(500), timeout(5000));
    }

    retornaContatos(): string[]{
        return this.listaUser;
    }
}
