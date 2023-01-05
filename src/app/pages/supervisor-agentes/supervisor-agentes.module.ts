import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorAgentesPageRoutingModule } from './supervisor-agentes-routing.module';

import { SupervisorAgentesPage } from './supervisor-agentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorAgentesPageRoutingModule
  ],
  declarations: [SupervisorAgentesPage]
})
export class SupervisorAgentesPageModule {}
