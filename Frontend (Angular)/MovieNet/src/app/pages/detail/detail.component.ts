import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetServerService } from 'src/app/services/net-server.service';
import { Title } from '@angular/platform-browser';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() state: any;
  detailId: any;
  movie: any;
  public openMenu: boolean = false;
  // public openMenu: any;

  constructor(
    private titleService: Title,
    private router: ActivatedRoute,
    private apiTMDB: ApiThemoviedbService
  ) {}

  ngOnInit(): void {
    // Obtenemos el id de la pelicula en la url
    this.router.params.subscribe((params) => {
      this.detailId = params['Id'];
      console.log(params);
    });
    this.apiTMDB.getMovieDetail(this.detailId).subscribe((movie: any) => {
      const {
        backdrop_path,
        poster_path,
        title,
        vote_average,
        runtime,
        releases: {
          countries: [{ certification }],
        },
        release_date,
        casts: { cast, crew },
        videos: { results: videos },
        genres,
        overview,
        id,
      } = movie;

      // Nombramos la pestaña
      const setTitle = title + ' - MovieNet ';
      this.titleService.setTitle(setTitle);

      this.movie = movie;
    });
  }

  // Alternamos la apertura del menu
  activated() {
    this.openMenu = !this.openMenu;
  }
}
