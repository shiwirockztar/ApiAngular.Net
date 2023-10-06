import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseNetUrl } from './helper';

@Injectable({
  providedIn: 'root',
})
export class NetServerService {
  constructor(private http: HttpClient) {}

  // Obtenemos lista peliculas
  public cargarUltimasPelis(pagina: any) {
    return this.http.get(`${baseNetUrl}/`);
  }
  // Obtenemos lista peliculas populares
  public cargarPelisPop(pagina: any) {
    return this.http.get(`${baseNetUrl}/api/Movie`);
  }
  // Obtenemos lista peliculas
  public buscar(keyword: string) {
    return this.http.get(`${baseNetUrl}/api/Movie/keyword/${keyword}`);
  }
}
