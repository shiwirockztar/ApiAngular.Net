import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
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
    private login: LoginService,
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
        const { success, message, result, user } = answer;
        console.log(answer);
        console.log(success);
        if (!success) {
          console.log(answer);
          const txt = `Datos inválidos , vuelva a intentar !! ${message}`;
          this.snack.open(txt, 'Aceptar', {
            duration: 3000,
          });
          return;
        }
        this.login.loginUser(answer.result);
        this.login.setUser(answer.user);
        Swal.fire('¡ Bienvenido !', 'Disfruta de las peliculas', 'success');
        this.router.navigate(['/']);
      },
      (error) => {
        const txt = `Datos inválidos , vuelva a intentar !!`;
        this.snack.open(txt, 'Aceptar', {
          duration: 3000,
        });
        return;
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
