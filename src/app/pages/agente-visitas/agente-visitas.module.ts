import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenteVisitasPageRoutingModule } from './agente-visitas-routing.module';

import { AgenteVisitasPage } from './agente-visitas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenteVisitasPageRoutingModule
  ],
  declarations: [AgenteVisitasPage]
})
export class AgenteVisitasPageModule {}
