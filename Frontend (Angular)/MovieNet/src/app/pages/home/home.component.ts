import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';
import { NetServerService } from 'src/app/services/net-server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @Input() ListSearch: any;
  public homeMemory: any;

  //Atrapamos en home para enviar a galeria
  atrapar(mensaje: any) {
    this.homeMemory = mensaje;
    // console.log('reciby ', this.homeMemory);
  }
}
