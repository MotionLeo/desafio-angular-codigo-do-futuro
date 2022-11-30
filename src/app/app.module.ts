import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from '../app/main/main-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListaClienteComponent } from './pages/lista-cliente/lista-cliente.component';
import { HeaderComponent } from './pages/navegacao/header/header.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { FormProdutosComponent } from './pages/form-produtos/form-produtos.component';
import { FormsModule } from '@angular/forms';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    ListaClienteComponent,
    HeaderComponent,
    ProdutosComponent,
    FormProdutosComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [   
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
