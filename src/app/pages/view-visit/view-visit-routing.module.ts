import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewVisitPage } from './view-visit.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewVisitPageRoutingModule {}
