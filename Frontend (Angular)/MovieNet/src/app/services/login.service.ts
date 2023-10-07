import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //public loginStatusSubjec = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  // Iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    //return true;
  }

  // Retornamos un boleano describiendo si no hay alguien loguiado => TRUE
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      //console.log('isloggedIn token false');
      return false;
    } else {
      //console.log('isloggedIn token true');
      return true;
    }
  }

  //cerramos sesion y eliminamos el token del localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // Obtenemos el token
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    console.log('setUser ', user);
    localStorage.setItem('user', JSON.stringify(user));
    // localStorage.setItem('user', user);
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public logOut() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
