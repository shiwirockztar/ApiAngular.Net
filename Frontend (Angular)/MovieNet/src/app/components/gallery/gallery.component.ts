import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiThemoviedbService } from 'src/app/services/api-themoviedb.service';
import { NetServerService } from 'src/app/services/net-server.service';
import { debounceTime, map } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
//npm install ngx-infinite-scroll --save
export class GalleryComponent implements OnInit {
  @ViewChild('asPeli') play: any;
  @HostListener('window:scroll') onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    // console.log('scrolleando', yOffset);
    // if (yOffset > 1500) {
    //   this.pagina++;
    //   this.onScroll();
    // }
  }
  @Input() ListSearch: any;
  public pagina: any = 1;
  public listado: any = [];

  constructor(
    private answerPage: ApiThemoviedbService,
    private answerNet: NetServerService,
    private render: Renderer2,
    private router: Router,
    private elem: ElementRef
  ) {}

  ngOnInit(): void {
    // this.answerPage.cargarUltimasPelis(this.pagina).subscribe((res: any) => {
    this.answerNet.cargarPelisPop(this.pagina).subscribe((res: any) => {
      // this.answerNet.cargarUltimasPelis(this.pagina).subscribe((res: any) => {
      if (res) {
        this.listado = res.results;
        console.log(this.listado);
      } else {
        console.log('Hubo un error y no sabemos que paso');
      }
    });
  }

  onScroll() {
    this.pagina++;
    console.log(this.pagina);
    this.answerNet.cargarUltimasPelis(this.pagina).subscribe((res: any) => {
      if (res) {
        this.listado = this.listado.concat(res.results);
        // console.log(this.listado);
      } else {
        console.log('Hubo un error y no sabemos que paso');
      }
    });
  }

  onScrollUp() {
    // alert('Llegaste al inicio');
  }
  ngAfterViewInit(): void {}

  link(movie: any): void {
    this.router.navigate(['/detail/' + movie.id]);
  }
}
