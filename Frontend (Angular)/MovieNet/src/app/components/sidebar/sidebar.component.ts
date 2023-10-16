import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    public login: LoginService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  public logout() {
    this.login.logout();
    this.router.navigate(['/home']);
    // window.location.reload();
    this.snack.open('Cierre exitoso !!', 'Aceptar', {
      duration: 5000,
    });
  }
}
