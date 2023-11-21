import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FormComponent } from './components/form/form.component';
import { CadastrarUserComponent } from './components/pages/cadastrar-user/cadastrar-user.component';
import { EditarUserComponent } from './components/pages/editar-user/editar-user.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ChatComponent } from './components/pages/chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CadastrarUserComponent,
    EditarUserComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
