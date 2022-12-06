import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitaActualizarPageRoutingModule } from './visita-actualizar-routing.module';

import { VisitaActualizarPage } from './visita-actualizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitaActualizarPageRoutingModule
  ],
  declarations: [VisitaActualizarPage]
})
export class VisitaActualizarPageModule {}
