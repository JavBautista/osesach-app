import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorAgenteAvancePageRoutingModule } from './supervisor-agente-avance-routing.module';

import { SupervisorAgenteAvancePage } from './supervisor-agente-avance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorAgenteAvancePageRoutingModule
  ],
  declarations: [SupervisorAgenteAvancePage]
})
export class SupervisorAgenteAvancePageModule {}
