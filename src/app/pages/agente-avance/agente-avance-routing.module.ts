import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenteAvancePage } from './agente-avance.page';

const routes: Routes = [
  {
    path: '',
    component: AgenteAvancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenteAvancePageRoutingModule {}
