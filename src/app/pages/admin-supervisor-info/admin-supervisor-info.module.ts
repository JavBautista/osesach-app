import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSupervisorInfoPageRoutingModule } from './admin-supervisor-info-routing.module';

import { AdminSupervisorInfoPage } from './admin-supervisor-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSupervisorInfoPageRoutingModule
  ],
  declarations: [AdminSupervisorInfoPage]
})
export class AdminSupervisorInfoPageModule {}
