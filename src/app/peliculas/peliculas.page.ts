import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Pelicula } from '../Model/pelicula';
import { ServicioPeliculasService } from '../services/servicio-peliculas.service';


@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})
export class PeliculasPage implements OnInit {

  pelicula: Pelicula = new Pelicula();

  imgData: string;
  imgURL: string;


  constructor(private route: ActivatedRoute, private router: Router,
    public PeliculasService: ServicioPeliculasService) { 

    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.pelicula = this.router.getCurrentNavigation().extras.queryParams.pelicula;
        
      }
    });
  }

  ngOnInit() {
  }

  guardar(){
    console.log(this.pelicula);

    this.PeliculasService.savePelicula(this.pelicula);
 
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pelicula: this.pelicula
      }
    };

    this.router.navigate(['/confirmacionmensaje'], navigationExtras);
  }

  imageSeleccionada(data){
    console.log(data);
    this.imgData = data;
  }

  uploadFinished(data){
    this.pelicula.imagen = data;
  }

}
