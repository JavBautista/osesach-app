import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Directory } from 'src/app/interfaces/interfaces';
import { DirectoriesService } from 'src/app/services/directories.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-visita-actualizar',
  templateUrl: './visita-actualizar.page.html',
  styleUrls: ['./visita-actualizar.page.scss'],
})
export class VisitaActualizarPage implements OnInit {

  @Input() directory:Directory; 
  
  constructor(
    private modalCtrl:ModalController,
    private directoriesService:DirectoriesService,
    private toastController: ToastController,
    private alertController:AlertController,
    private geolocation:Geolocation,
  
    ) { }

  ngOnInit() {
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }


  async saveActualizacion(){
    await this.directoriesService.actualizarDirectory(this.directory);
    this.modalCtrl.dismiss();
  }

}
