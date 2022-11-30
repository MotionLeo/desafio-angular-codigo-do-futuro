import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from '../app/main/main-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListaClienteComponent } from './pages/lista-cliente/lista-cliente.component';
import { FormClienteComponent } from './pages/form-cliente/form-cliente.component';
import { HeaderComponent } from './pages/navegacao/header/header.component';
import { FooterComponent } from './pages/navegacao/footer/footer.component';
import { TelefonePipe } from './pipes/telefone.pipe';
import { CpfPipe } from './pipes/cpf.pipe';
import { CepPipe } from './pipes/cep.pipe';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './servicos/login.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaClienteComponent,
    FormClienteComponent,
    FooterComponent,
    TelefonePipe,
    CpfPipe,
    CepPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    LoginGuard,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
