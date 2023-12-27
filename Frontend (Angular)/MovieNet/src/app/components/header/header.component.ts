import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  public active: boolean = false;
  public menuAbierto: boolean = false;

  ngOnInit(): void {
    this.active = false;
    this.menuAbierto = false;
  }

  public toggle() {
    this.active = !this.active;
  }

  public activ() {
    this.menuAbierto = !this.menuAbierto;
    this.toggleMenu.emit();
  }
}
