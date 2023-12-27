import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetServerService } from 'src/app/services/net-server.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';
import { imageBaseUrl } from '../../services/helper';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() state: any;
  detailId: any;
  movie: any;
  public cast: any;
  public crew: any;
  public certification: any;
  public youtubeList: any;
  imageUrl: any = imageBaseUrl;
  public openMenu: boolean = false;

  constructor(
    private titleService: Title,
    private router: ActivatedRoute,
    private routerB: Router,
    private apiTMDB: ApiThemoviedbService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Obtenemos el id de la pelicula en la url
    this.router.params.subscribe((params) => {
      this.detailId = params['Id'];
    });
    // Obtenemos los detalles de la pelicula
    this.getDetail();
  }

  // Alternamos la apertura del menu
  activated() {
    this.openMenu = !this.openMenu;
  }

  getDetail(): void {
    this.apiTMDB.getDetailMovie(this.detailId).subscribe((movie: any) => {
      if (movie) {
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
        this.cast = cast;
        this.crew = crew;
        this.certification = certification;

        // Lista de youtube
        this.youtubeList = this.filterVideos(videos);
      }
    });
  }
  getGenres = function (genreList: any): any {
    const newGenreList = [];
    for (const { name } of genreList) newGenreList.push(name);
    return newGenreList.join(', ');
  };

  getCasts = function (castList: any): any {
    const newCastList = [];
    for (let i = 0, len = castList.length; i < len && i < 10; i++) {
      const { name } = castList[i];
      newCastList.push(name);
    }
    return newCastList.join(', ');
  };

  getDirector = function (crewList: any): any {
    const directors = crewList.filter(({ job }: any) => job == 'Director');
    const directorList = [];
    for (const { name } of directors) directorList.push(name);
    return directorList.join(', ');
  };

  // Retornamos un array de videos
  filterVideos(videoList: any): any {
    return videoList.filter(
      ({ type, site }: any) =>
        (type == 'Trailer' || type == 'Teaser') && site == 'YouTube'
    );
  }

  getVideoSrc(key: any) {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0`
    );
    return safeUrl;
  }

  link(movie: any): void {
    this.routerB.navigate(['/details/' + movie.id]);
  }
}
