import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenteDirectoryPageRoutingModule } from './agente-directory-routing.module';

import { AgenteDirectoryPage } from './agente-directory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenteDirectoryPageRoutingModule
  ],
  declarations: [AgenteDirectoryPage]
})
export class AgenteDirectoryPageModule {}
