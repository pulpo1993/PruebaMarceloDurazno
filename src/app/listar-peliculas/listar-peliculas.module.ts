import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarPeliculasPageRoutingModule } from './listar-peliculas-routing.module';

import { ListarPeliculasPage } from './listar-peliculas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarPeliculasPageRoutingModule
  ],
  declarations: [ListarPeliculasPage]
})
export class ListarPeliculasPageModule {}
