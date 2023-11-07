import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css'],
})
export class HomeSidebarComponent {
  @Input() state: any;
  public on: boolean = false;

  ngOnInit(): void {
    this.on = this.state;
    console.log(' homSidebar: ', this.state);
  }
}
