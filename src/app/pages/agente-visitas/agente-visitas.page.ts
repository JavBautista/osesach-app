import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DirectoryPage } from '../directory/directory.page';
import { Directory } from '../../interfaces/interfaces';
import { DirectoriesService } from '../../services/directories.service';
import { AgenteAvancePage } from '../agente-avance/agente-avance.page';

@Component({
  selector: 'app-agente-visitas',
  templateUrl: './agente-visitas.page.html',
  styleUrls: ['./agente-visitas.page.scss'],
})
export class AgenteVisitasPage implements OnInit {
  visitados:boolean=true;
  habilitado=true;
  textoBuscar:'';

  directories: Directory[]=[];  

  constructor(
    private directoriesService:DirectoriesService,
    private toastController: ToastController,
    private modalCtrl:ModalController

  ) { }

  ngOnInit() {

    this.siguientes(null,true);
    
  }

  recargar(event){
    this.siguientes(event, true)
    this.habilitado=true;
    this.directories=[];
  }


  async siguientes(event?, pull:boolean=false){
    this.directoriesService.getDirectoriesAgent(this.visitados, pull, this.textoBuscar)
      .subscribe( resp=>{
        this.directories.push(...resp.data);
        if(event){
          event.target.complete();
          if(resp.data.length ===0){
            //event.target.disabled=true;
            this.habilitado=false;
          }
        }
      });
  }


  async presentToast(msg:string='') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }//.presentToast()

 

  async selectDiretoryVisit(directory){
    console.log('Abrir direccion')
    const modal = await this.modalCtrl.create({
      component: AgenteAvancePage,
      componentProps:{
        directory:directory
        
      }
    });
    await modal.present();

  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

  onSearchChange(event){
    this.textoBuscar = event.detail.value;
    this.directories=[];
    this.siguientes(null,true);
  }

}
