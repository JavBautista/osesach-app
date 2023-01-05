import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorAvancesPageRoutingModule } from './supervisor-avances-routing.module';

import { SupervisorAvancesPage } from './supervisor-avances.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorAvancesPageRoutingModule
  ],
  declarations: [SupervisorAvancesPage]
})
export class SupervisorAvancesPageModule {}
