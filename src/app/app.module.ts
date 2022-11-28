import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { HeaderComponent } from './pages/navegacao/header/header.component';
=======
import { MainRoutingModule } from './main/main-routing.module';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
