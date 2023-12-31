import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiMovieDbUrl, api_key, language } from './helper';

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
}
