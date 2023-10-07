import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NetServerService } from 'src/app/services/net-server.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css'],
})
export class MoviedetailsComponent {
  detail: any;
  constructor(private route: ActivatedRoute) {}

  ngOninit(): void {
    // Obtenemos el nombre de la sala de la url
    this.route.params.subscribe((params) => {
      console.log(params);
    });
    // this.detail = this.route.snapshot.paramMap.get('detail:');
    // console.log(this.detail);
  }
}
