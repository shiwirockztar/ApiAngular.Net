import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';
import { imageBaseUrl } from 'src/app/services/helper';

@Component({
  selector: 'app-recommended-list',
  templateUrl: './recommended-list.component.html',
  styleUrls: ['./recommended-list.component.css'],
})
export class RecommendedListComponent {
  public imageUrl: any = imageBaseUrl;
  detailId: any;
  // Catalogo de pagina de inicio
  public homePageSections: any = [
    {
      title: 'You May Also Like',
    },
  ];

  constructor(
    private apiTMDB: ApiThemoviedbService,
    private router: ActivatedRoute,
    private routerB: Router,
    // private location: Location,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Obtenemos el id de la pelicula en la url
    this.router.params.subscribe((params) => {
      this.detailId = params['Id'];
    });
    this.apiTMDB.getRecommendedMovie(this.detailId).subscribe((movie: any) => {
      if (movie) {
        this.homePageSections[0].movies = movie.results;
      }
    });
  }

  link(movie: any): void {
    this.routerB.navigate(['details/' + movie.id]);
    location.reload();
  }
}
