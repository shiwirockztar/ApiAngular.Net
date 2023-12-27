import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiMovieDbUrl, api_key, language } from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiThemoviedbService {
  constructor(private http: HttpClient) {}

  // Obtenemos lista peliculas
  public cargarUltimasPelis(pagina: any) {
    return this.http.get(
      `${ApiMovieDbUrl}api_key=${api_key}&language=${language}&page=${pagina}`
    );
  }

  // Obtenemos lista peliculas
  public getGenres(): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`
    );
  }

  // Obtenemos lista peliculas
  public getBanner() {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`
    );
  }

  // Obtenemos lista peliculas
  public getMovieList(path: any) {
    return this.http.get(
      `https://api.themoviedb.org/3${path}?api_key=${api_key}&page=1`
    );
  }

  // Obtenemos detalles de la pelicula
  public getDetailMovie(movieId: any) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,releases,translations`
    );
  }

  // Obtenemos peliculas relacionadas
  public getRecommendedMovie(movieId: any) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}`
    );
  }
}
