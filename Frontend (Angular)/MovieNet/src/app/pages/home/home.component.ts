import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public pagina: any = 1;
  public peliculas = '';
  public ultimaPelicula: any;
  public listado: any;

  constructor(
    private answerPage: ApiThemoviedbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.answerPage.cargarPeliculas(this.pagina).subscribe((res: any) => {
      if (res) {
        this.listado = res.results;
        console.log(this.listado);
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
}
