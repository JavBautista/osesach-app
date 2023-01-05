import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorAgentesPage } from './supervisor-agentes.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorAgentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorAgentesPageRoutingModule {}
