import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from '../app/main/main-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListaClienteComponent } from './pages/lista-cliente/lista-cliente.component';
import { HeaderComponent } from './pages/navegacao/header/header.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaClienteComponent,
    HeaderComponent,
    ProdutosComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
