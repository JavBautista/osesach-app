import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitaActualizarPage } from './visita-actualizar.page';

const routes: Routes = [
  {
    path: '',
    component: VisitaActualizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitaActualizarPageRoutingModule {}
