import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/pages/login/login.component';
import { CadastrarUserComponent } from './components/pages/cadastrar-user/cadastrar-user.component';
import { EditarUserComponent } from './components/pages/editar-user/editar-user.component';
import { ChatComponent } from './components/pages/chat/chat.component';

const routes: Routes = [
  {path:'' , redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'login/cadastrar', component: CadastrarUserComponent},
  {path: 'perfil/:id', component: EditarUserComponent},
  {path: 'chat', component: ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
