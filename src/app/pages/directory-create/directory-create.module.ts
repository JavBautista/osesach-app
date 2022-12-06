import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectoryCreatePageRoutingModule } from './directory-create-routing.module';

import { DirectoryCreatePage } from './directory-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectoryCreatePageRoutingModule
  ],
  declarations: [DirectoryCreatePage]
})
export class DirectoryCreatePageModule {}
