import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UnidadComponent } from './unidad/unidad.component';



@NgModule({
  declarations: [
    UnidadComponent
  ],
  exports: [
    UnidadComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
