import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectoryCreatePage } from './directory-create.page';

const routes: Routes = [
  {
    path: '',
    component: DirectoryCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectoryCreatePageRoutingModule {}
