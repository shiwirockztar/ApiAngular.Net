import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NetServerService } from 'src/app/services/net-server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinData = {
    idUser: 0,
    name: '',
    email: '',
    password: '',
    movies: [],
  };

  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private ans: NetServerService
  ) {}

  formSubmit() {
    if (
      this.signinData.name.trim() == null ||
      this.signinData.name.trim() == '' ||
      this.signinData.name == null
    ) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    if (
      this.signinData.password.trim() == '' ||
      this.signinData.password.trim() == null
    ) {
      this.snack.open('La contraseña es requerida !!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    this.ans.generateToken(this.signinData).subscribe(
      (answer: any) => {
        const { success, message, result } = answer;
        if (!success) {
          console.log(answer);
          const txt = `Datos inválidos , vuelva a intentar !! ${message}`;
          this.snack.open(txt, 'Aceptar', {
            duration: 3000,
          });
          return;
        }
        const data = result;
        console.log(data);
        this.ans.signInUser(data);
        Swal.fire('¡ Bienvenido !', 'Disfruta de las peliculas', 'success');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  linkLogIn() {
    this.router.navigate(['/login']);
  }

  reset() {
    this.signinData.name = '';
  }
}
