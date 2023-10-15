import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NetServerService } from 'src/app/services/net-server.service';
// import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';

// @NgModule({
//   imports: [CommonModule],
//   declarations: [MoviedetailsComponent],
// }),

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css'],
})
export class MoviedetailsComponent implements OnInit {
  detailId: any;
  detailMovie: any;
  genres: any;
  constructor(
    private router: ActivatedRoute,
    private answerNet: NetServerService
  ) {}

  ngOnInit(): void {
    // Obtenemos el id de la pelicula en la url
    this.router.params.subscribe((params) => {
      this.detailId = params['Id'];
      console.log(params);
    });
    this.answerNet.buscarPorId(this.detailId).subscribe((res: any) => {
      this.genres = res.genres;
      this.detailMovie = res;

      console.log(res);
      console.log(this.genres);
    });
  }

  ngAfterViewInit(): void {
    console.log(this.detailMovie.spoken_languages);
    console.log(this.detailMovie.spoken_languages[0].name);
  }
}
