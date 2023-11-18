import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css'],
})
export class HomeSidebarComponent {
  @Input() state: any;
  public genreList: any = {};
  // public genreList: any = []; como arreglo se iteran muchos expacios vacios en html

  constructor(
    private apiTMDB: ApiThemoviedbService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.apiTMDB.getGenres().subscribe(
      (data: any) => {
        for (const { id, name } of data.genres) {
          this.genreList[id] = name;
        }
        // console.log(this.genreList);
      },
      (error) => {
        // return;
        // console.error(error);
      }
    );
  }

  getObjectKeys(objeto: any): any[] {
    // console.log(objeto);
    // console.log(Object.keys(objeto));
    return Object.keys(objeto);
  }
}
