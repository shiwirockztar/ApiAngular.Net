import { query } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { NetServerService } from 'src/app/services/net-server.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() enviar: EventEmitter<string> = new EventEmitter<string>();
  public findList: any;
  public sign: boolean = false;
  control = new FormControl();

  private miAtributoSubject = new Subject<string>();
  findListB$ = this.miAtributoSubject.asObservable();

  constructor(private answerNet: NetServerService, private router: Router) {}

  ngOnInit(): void {
    this.observerChangeSearch();
  }

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

  logOut() {
    localStorage.removeItem('token');
  }
}
