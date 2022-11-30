import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from '../app/main/main-routing.module';

import { AppComponent } from './app.component';
import { ListaClienteComponent } from './pages/lista-cliente/lista-cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/navegacao/header/header.component';
import { LoginGuard } from './servicos/login.guard';

@NgModule({
  declarations: [
    AppComponent,
    ListaClienteComponent,
    HeaderComponent,
    LoginComponent,
    
    
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    FormsModule
  ],
  providers: [
    LoginGuard,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
