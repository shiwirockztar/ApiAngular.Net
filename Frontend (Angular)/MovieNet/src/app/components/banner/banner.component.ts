import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  ViewChild,
  ElementRef,
  QueryList,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';
import { imageBaseUrl } from '../../services/helper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit, AfterViewInit {
  @ViewChildren('posterBox') posterBox: QueryList<ElementRef> =
    new QueryList<ElementRef>();
  @ViewChildren('sliderItem') sliderItem: QueryList<ElementRef> =
    new QueryList<ElementRef>();
  @ViewChild('listItem', { static: true })
  listItem!: ElementRef<HTMLButtonElement>;
  public movieList: any = {};
  public imageUrl: any = imageBaseUrl;

  constructor(private apiTMDB: ApiThemoviedbService, private router: Router) {}

  ngOnInit(): void {
    // Renderizar Banner por consumo de api
    this.apiTMDB.getBanner().subscribe((data: any) => {
      // console.log(data);
      this.movieList = data.results;
    });
  }

  async ngAfterViewInit() {
    this.addHeroSlide();
    let x: Promise<any> = await this.aString([28, 53, 1000]);
    console.log(x);
    this.getMe([28, 53, 1000]);
  }

  getGenreFromList(genreIdList: any) {
    let newGenreList: any = [];
    for (const genreId of genreIdList) {
      newGenreList.push(this.list[genreId]);
    }
    return newGenreList.join(', ');
  }

  /**
   * Funcion para activar en el slider la carta seleccionada
   */
  addHeroSlide() {
    // Escucha el evento changes para asegurarte de que los elementos de posterBox estén disponibles
    this.posterBox.changes.subscribe(() => {
      // Escucha el evento changes para asegurarte de que los elementos de sliderItem estén disponibles
      this.sliderItem.changes.subscribe(() => {
        const sliderItems = this.sliderItem.toArray();
        const sliderControls = this.posterBox.toArray();
        let lastSliderItem = sliderItems[0];
        let lastSliderControl = sliderControls[0];
        lastSliderItem.nativeElement.classList.add('active');
        lastSliderControl.nativeElement.classList.add('active');

        // En cada uno de los elementos le agreganmos un HeroSlide
        sliderControls.forEach((item, index) => {
          item.nativeElement.onclick = () => {
            lastSliderItem.nativeElement.classList.remove('active');
            lastSliderControl.nativeElement.classList.remove('active');
            lastSliderItem = sliderItems[index];
            lastSliderControl = sliderControls[index];
            lastSliderItem.nativeElement.classList.add('active');
            lastSliderControl.nativeElement.classList.add('active');
          };
        });
      });
    });
  }

  activar(numero: any) {
    // console.log(numero);
    // return numero;
  }

  async aString(genreIdList: any): Promise<any> {
    try {
      const data: any = await this.apiTMDB.getGenres().toPromise();

      const newGenreList = data.genres
        .filter((genre: any) => genreIdList.includes(genre.id))
        .map((genre: any) => genre.name);

      console.log('newGenreList ', newGenreList);
      return newGenreList;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }

    // return new Promise((resolve, reject) => {
    //   let newGenreList: any = [];
    //   this.apiTMDB.getGenres().subscribe(
    //     (data: any) => {
    //       for (const { id, name } of data.genres) {
    //         for (const genreId of genreIdList) {
    //           if (genreId == id) {
    //             newGenreList.push(name);
    //           }
    //         }
    //       }
    //       console.log('newGenreList ', newGenreList);
    //       resolve(newGenreList);
    //     },
    //     (error) => {
    //       // Rechaza la promesa con el error
    //       reject(error);
    //     }
    //   );
    // });
  }

  async getMe(genreIdLis: any) {
    try {
      const genreIdList = genreIdLis;
      const result = await this.aString(genreIdList);
      console.log('Result:', result);
      return result.join(', ');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Lista colocada mientras fixeamos El hecho de que la lista de genero sea un objeto vacío
  // podría deberse a que el ciclo de vida de Angular no ha tenido tiempo suficiente para procesar y recoger
  // los elementos de la vista. En situaciones asíncronas, podría ocurrir que intentes acceder a los elementos
  // antes de que estén disponibles.
  public list: any = {
    '12': 'Adventure',
    '14': 'Fantasy',
    '16': 'Animation',
    '18': 'Drama',
    '27': 'Horror',
    '28': 'Action',
    '35': 'Comedy',
    '36': 'History',
    '37': 'Western',
    '53': 'Thriller',
    '80': 'Crime',
    '99': 'Documentary',
    '878': 'Science Fiction',
    '9648': 'Mystery',
    '10402': 'Music',
    '10749': 'Romance',
    '10751': 'Family',
    '10752': 'War',
    '10770': 'TV Movie',
  };

  OaString(genreIdList: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let newGenreList: any = [];
      this.apiTMDB.getGenres().subscribe(
        (data: any) => {
          for (const { id, name } of data.genres) {
            for (const genreId of genreIdList) {
              if (genreId == id) {
                newGenreList.push(name);
              }
            }
          }
          console.log('newGenreList ', newGenreList);
          resolve(newGenreList);
        },
        (error) => {
          // Rechaza la promesa con el error
          reject(error);
        }
      );
    });
  }

  link(movie: any): void {
    this.router.navigate(['/details/' + movie.id]);
  }
}
