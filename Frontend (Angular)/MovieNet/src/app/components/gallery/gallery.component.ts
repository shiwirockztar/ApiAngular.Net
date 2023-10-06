import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';
import { NetServerService } from 'src/app/services/net-server.service';
import { debounceTime, map } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  @Input() ListSearch: any;
  public pagina: any = 1;
  public peliculas = '';
  public ultimaPelicula: any;
  public listado: any;
  public listadoB: any;

  constructor(
    private answerPage: ApiThemoviedbService,
    private answerNet: NetServerService,
    private router: Router
  ) {}

  // private nav: NavbarComponent,

  ngOnInit(): void {
    // this.nav.findListB.subscribe((valor) => {
    //   this.listadoB$ = valor;
    //   console.log('nuevo valor', this.listadoB);
    // });

    this.observerChange();
    this.answerNet.cargarPelisPop(this.pagina).subscribe((res: any) => {
      if (res) {
        this.listado = res.results;
        console.log(this.listado);
      } else {
        console.log('Hubo un error y no sabemos que paso');
      }
    });
  }

  observerChange() {
    // setInterval(() => {
    //   if (this.ListSearch) {
    //     setTimeout(this.observador, 2000);
    //     console.log('hay una busqueda', this.ListSearch);
    //   } else {
    //     console.log('No hay una busqueda');
    //   }
    // }, 500);
  }

  // Creamos el observador
  observador(): void {
    new IntersectionObserver(
      (entradas, observador) => {
        console.log(entradas);

        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            this.pagina++;
            //cargarPeliculas();
          }
        });
      },
      {
        rootMargin: '0px 0px 200px 0px',
        threshold: 1.0,
      }
    );
  }
}
