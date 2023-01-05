import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSupervisoresPageRoutingModule } from './admin-supervisores-routing.module';

import { AdminSupervisoresPage } from './admin-supervisores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSupervisoresPageRoutingModule
  ],
  declarations: [AdminSupervisoresPage]
})
export class AdminSupervisoresPageModule {}
