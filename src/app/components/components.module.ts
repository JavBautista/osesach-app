import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UnidadComponent } from './unidad/unidad.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    UnidadComponent
  ],
  exports: [
    UnidadComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
