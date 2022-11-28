import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from './main/main-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/navegacao/header/header.component';
import { ListaClienteComponent } from './pages/lista-cliente/lista-cliente.component';
import { FormClienteComponent } from './pages/form-cliente/form-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaClienteComponent,
    FormClienteComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
