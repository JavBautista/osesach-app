import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectoryImagePageRoutingModule } from './directory-image-routing.module';

import { DirectoryImagePage } from './directory-image.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectoryImagePageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [DirectoryImagePage]
})
export class DirectoryImagePageModule {}
