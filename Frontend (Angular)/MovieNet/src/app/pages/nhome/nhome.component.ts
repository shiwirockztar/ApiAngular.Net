import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nhome',
  templateUrl: './nhome.component.html',
  styleUrls: ['./nhome.component.css'],
})
export class NhomeComponent {
  @Input() state: any;
  public openMenu: boolean = false;
  // public openMenu: any;

  // Alternamos la apertura del menu
  activated() {
    this.openMenu = !this.openMenu;
  }
}
