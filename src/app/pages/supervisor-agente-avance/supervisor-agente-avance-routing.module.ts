import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorAgenteAvancePage } from './supervisor-agente-avance.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorAgenteAvancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorAgenteAvancePageRoutingModule {}
