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
    return this.http.get(`${baseNetUrl}/api/movie/last/${pagina}`);
  }
  // Obtenemos lista peliculas populares
  public cargarPelisPop(pagina: any) {
    return this.http.get(`${baseNetUrl}/api/Movie/populars/${pagina}`);
  }
  // Obtenemos lista peliculas buscadas por el nombre (keyword)
  public buscar(keyword: string) {
    return this.http.get(`${baseNetUrl}/api/Movie/keyword/${keyword}`);
  }
  // Obtenemos pelicula por (id)
  public buscarPorId(id: string) {
    return this.http.get(`${baseNetUrl}/api/Movie/${id}`);
  }
  // Obtenemos lista peliculas del usuario (id)
  public buscarDelUsuarioPorId(id: string) {
    return this.http.get(`${baseNetUrl}/api/Movie/GetMovies/${id}`);
  }

  // Proceso de registro
  public login(user: any) {
    return this.http.post(`${baseNetUrl}/api/user`, user);
  }
  //generamos proceso signIn
  public generateToken(user: any) {
    return this.http.post(`${baseNetUrl}/api/user/signin`, user);
  }
}
