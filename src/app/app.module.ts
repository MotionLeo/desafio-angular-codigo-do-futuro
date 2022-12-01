import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from '../app/main/main-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListaClienteComponent } from './pages/lista-cliente/lista-cliente.component';
import { FormClienteComponent } from './pages/form-cliente/form-cliente.component';
import { HeaderComponent } from './pages/navegacao/header/header.component';


import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './pages/navegacao/footer/footer.component';
import { TelefonePipe } from './pipes/telefone.pipe';
import { CpfPipe } from './pipes/cpf.pipe';
import { CepPipe } from './pipes/cep.pipe';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './servicos/login.guard';
import { NotFoundComponent } from './pages/navegacao/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaClienteComponent,
    CarrinhoComponent,
    FormClienteComponent,
    FooterComponent,
    TelefonePipe,
    CpfPipe,
    CepPipe,
    LoginComponent,
    NotFoundComponent,
    HomeComponent,
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
