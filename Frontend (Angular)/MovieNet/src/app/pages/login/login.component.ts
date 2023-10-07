import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NetServerService } from 'src/app/services/net-server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  registerData = {
    name: '',
    nick: '',
    email: '',
    telefono: '',
    password: '',
    confirm: '',
    movies: [],
  };

  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private answ: NetServerService
  ) {}

  formSubmit() {
    if (this.registerData.name == '' || this.registerData.name == null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (
      this.registerData.password.trim() == '' ||
      this.registerData.confirm.trim() == null
    ) {
      this.snack.open('La contraseña es requerida !!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    if (this.registerData.password.trim() != this.registerData.confirm.trim()) {
      this.snack.open('Las contraseña son diferentes !!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.answ.login(this.registerData).subscribe(
      (data: any) => {
        if (data.text) {
          console.log(data.text);
          const txt = `Datos inválidos , vuelva a intentar !! ${data.text}`;
          this.snack.open(txt, 'Aceptar', {
            duration: 3000,
          });
          return;
        }
        console.log(data);
        Swal.fire(
          'usuario guardado',
          'usuario registrado en el sistema',
          'success'
        );
        this.router.navigate(['Signin']);
      },
      (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration: 3000,
        });
      }
    );
  }

  linkSignIn() {
    this.router.navigate(['/Signin']);
  }
}
