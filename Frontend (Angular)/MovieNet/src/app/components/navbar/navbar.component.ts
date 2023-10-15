import { query } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { NetServerService } from 'src/app/services/net-server.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() enviar: EventEmitter<string> = new EventEmitter<string>();
  public findList: any;
  public user: any;
  public signIn: boolean = false;
  control = new FormControl();

  constructor(
    private answerNet: NetServerService,
    public login: LoginService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.observerChangeSearch();
    //preguntamos si hay un usuario en localStorage
    this.user = this.login.getUser();
    if (this.user) {
      this.signIn = true;
    }
    //this.login.loginStatusSubjec.asObservable().subscribe((data) => {
    // this.signIn = this.login.isLoggedIn();
    // console.log('usuario activo :', this.signIn);
    // this.user = this.login.getUser().JSON();
    // console.log('Nombre de usuario :', this.user);
    // });
    // console.log(this.user);
  }

  // atento ala busqueda
  observerChangeSearch() {
    this.control.valueChanges.pipe(debounceTime(500)).subscribe((query) => {
      this.search(query);
    });
  }

  search(query: string) {
    if (query != '') {
      //query.trim().length === 0
      this.answerNet
        .buscar(query)
        .pipe(
          map((result: any) => {
            //guardamos la lista de busqueda
            this.findList = result.results;
            // La enviamos a el componente padre
            this.enviar.emit(this.findList);
            console.log(this.findList);
            result.results.map((hit: any) => {});
          })
        )
        .subscribe((res: any) => {
          if (res) {
            console.log(res);
          } else {
            console.log('Hubo un error y no sabemos que paso');
          }
        });
    } else {
      this.findList = [{}];
      this.enviar.emit(this.findList);
    }
  }

  public logout() {
    this.login.logout();
    this.router.navigate(['/home']);
    // window.location.reload();
    this.snack.open('Cierre exitoso !!', 'Aceptar', {
      duration: 5000,
    });
  }
}
