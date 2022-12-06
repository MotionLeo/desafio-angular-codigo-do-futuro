import { Component, OnInit } from '@angular/core';
import { LogadoService } from 'src/app/servicos/logado.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public logadoService:LogadoService
  ) { }

  ngOnInit(): void {
  }

}
