import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenteDirectoryPage } from './agente-directory.page';

const routes: Routes = [
  {
    path: '',
    component: AgenteDirectoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenteDirectoryPageRoutingModule {}
