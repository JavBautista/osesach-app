import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenteAvancePageRoutingModule } from './agente-avance-routing.module';

import { AgenteAvancePage } from './agente-avance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenteAvancePageRoutingModule
  ],
  declarations: [AgenteAvancePage]
})
export class AgenteAvancePageModule {}
