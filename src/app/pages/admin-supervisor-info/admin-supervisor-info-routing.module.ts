import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSupervisorInfoPage } from './admin-supervisor-info.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSupervisorInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSupervisorInfoPageRoutingModule {}
