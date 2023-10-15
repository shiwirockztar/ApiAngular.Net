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

  ngOnInit(): void {
    // this.answerNet.cargarPelisPop(this.pagina).subscribe((res: any) => {
    this.answerNet.cargarUltimasPelis(this.pagina).subscribe((res: any) => {
      if (res) {
        this.listado = res.results;
        console.log(this.listado);

        if (this.pagina < 1000) {
          if (this.ultimaPelicula) {
            //this.observador.unobserve(this.ultimaPelicula);
          }

          const peliculasEnPantalla = document.querySelectorAll(
            '.contenedor .pelicula'
          );
          this.ultimaPelicula =
            peliculasEnPantalla[peliculasEnPantalla.length - 1];
          //this.observador.observe(this.ultimaPelicula);
        }
      } else {
        console.log('Hubo un error y no sabemos que paso');
      }
    });
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

  link(movie: any): void {
    this.router.navigate(['/detail/' + movie.id]);
  }
}
