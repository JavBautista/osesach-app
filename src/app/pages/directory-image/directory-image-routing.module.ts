import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectoryImagePage } from './directory-image.page';

const routes: Routes = [
  {
    path: '',
    component: DirectoryImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectoryImagePageRoutingModule {}
