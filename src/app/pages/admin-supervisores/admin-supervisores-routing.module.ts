import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSupervisoresPage } from './admin-supervisores.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSupervisoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSupervisoresPageRoutingModule {}
