import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenteVisitasPage } from './agente-visitas.page';

const routes: Routes = [
  {
    path: '',
    component: AgenteVisitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenteVisitasPageRoutingModule {}
