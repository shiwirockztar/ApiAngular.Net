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
  @Input() state: any;
  public openMenu: boolean = false;
  // public openMenu: any;

  // Alternamos la apertura del menu
  activated() {
    this.openMenu = !this.openMenu;
  }
}
