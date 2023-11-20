import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';
import { imageBaseUrl } from '../../services/helper';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  public imageUrl: any = imageBaseUrl;
  // Catalogo de pagina de inicio
  public homePageSections: any = [
    {
      title: 'Upcoming Movies',
      path: '/movie/upcoming',
    },
    {
      //title: "Today's Trending Movies",
      title: 'Weekly Trending Movies',
      path: '/trending/movie/week',
    },
    {
      title: 'Top Rated Movies',
      path: '/movie/top_rated',
    },
  ];

  constructor(
    private apiTMDB: ApiThemoviedbService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Renderizar Seccion de catalogos por consumo de api
    this.load();
    // console.log('Valor homePageSections:', this.homePageSections);
  }

  /**
   * Creamos las cartas de peliculas de las secciones
   */
  load(): Promise<any> {
    const loadMoviesForSection = (sectionIndex: number): Promise<any> => {
      return new Promise((resolve, reject) => {
        const path = this.homePageSections[sectionIndex].path;
        this.apiTMDB.getMovieList(path).subscribe(
          ({ results: movieList }: any) => {
            this.homePageSections[sectionIndex].movies = movieList;
            // Resuelve la promesa con el valor
            resolve(movieList);
          },
          (error) => {
            // Rechaza la promesa con el error
            reject(error);
          }
        );
      });
    };

    // Creamos un array de promesas para cargar las listas de películas para todas las secciones
    const promises: Promise<any>[] = [];

    // Iteramos sobre las secciones y llamamos a loadMoviesForSection para cargar las listas de películas
    for (let i = 0; i < this.homePageSections.length; i++) {
      promises.push(loadMoviesForSection(i));
    }

    // Devolvemos una nueva promesa que se resuelve cuando todas las promesas para las secciones se han completado
    return Promise.all(promises);
  }

  link(movie: any): void {
    this.router.navigate(['/details/' + movie.id]);
  }

  /**
   * Creamos las cardas de peliculas de las secciones (problema no sube el coontador y se quedara en 0)
   */
  Oload(): Promise<any> {
    let count = 0;
    return new Promise((resolve, reject) => {
      let path = this.homePageSections[count].path;
      this.apiTMDB.getMovieList(path).subscribe(
        ({ results: movieList }: any) => {
          // let count = 0;
          for (const { title, path } of this.homePageSections) {
            // Agregamos la lista de peliculas de la seccion seleccionada
            this.homePageSections[count].movies = movieList;
            count++;
          }
          // Resuelve la promesa con el valor
          resolve(movieList);
        },
        (error) => {
          // Rechaza la promesa con el error
          reject(error);
        }
      );
    });
  }
}
