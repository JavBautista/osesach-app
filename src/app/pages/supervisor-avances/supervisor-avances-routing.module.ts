import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorAvancesPage } from './supervisor-avances.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorAvancesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorAvancesPageRoutingModule {}
